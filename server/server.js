require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')

const linksRouter = require('./routes/links')
const userInfoRouter = require('./routes/userInfo')

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
)

const app = express()

app.use(express.json())
app.use(cors())

app.use('/links', linksRouter)
app.use('/user-info', userInfoRouter)

app.get('/', async (req, res) => {
    const { userId } = req.query

    const responseData = {
        userInfo: null,
        links: null,
        error: null
    }

    if (!userId) {
        responseData.error = 'No user Id'

        return res.status(400).json(responseData)
    }

    try {
        const {
            data,
            error
        } = await supabase.from('userData').select().filter('userId', 'eq', userId)

        if (!data || error) {
            responseData.error = error?.message || 'No user data found'

            return res.status(404).json(responseData)
        }

        const userData = data[0]

        if (userData) {
            const {
                firstName,
                lastName,
                profileImg,
                email,
                links
            } = userData

            responseData.userInfo = {
                firstName,
                lastName,
                email,
                profileImg
            }

            responseData.links = links

            return res.json(responseData)
        } else {
            responseData.error = 'No user data found'

            return res.status(404).json(responseData)
        }
    } catch (e) {
        responseData.error = e?.message || 'Error fetching data'

        return res.status(500).json(responseData)
    }
})

async function insertUser(userId) {
    const {
        error
    } = await supabase
        .from('userData')
        .insert({
            firstName: '',
            lastName: '',
            profileImg: '',
            userId,
            email: '',
            links: []
        })

    return error ? false : true
}

app.post('/signup', async (req, res) => {
    const { email, password } = req.body

    const responseData = {
        user: null,
        session: null,
        error: null
    }

    if (!email || !password) {
        responseData.error = 'Missing user data'
        
        return res.status(400).json(responseData)
    }

    try {
        const {
            data,
            error
        } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            responseData.error = error.message

            return res.json(responseData)
        }

        const userInserted = await insertUser(data.user.id)

        if (userInserted) {
            responseData.user = data.user
            responseData.session = data.session

            return res.status(201).json(responseData)
        } else {
            responseData.error = 'Failed to create account'

            res.status(424).json(responseData)
        }
    } catch (e) {
        responseData.error = e

        res.status(500).json(responseData)
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    const responseData = {
        user: null,
        session: null,
        error: null
    }

    if (!email || !password) {
        responseData.error = 'Missing user data'
        
        return res.status(400).json(responseData)
    }

    try {
        const {
            data,
            error
        } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            responseData.error = error.message

            return res.json(responseData)
        }

        responseData.user = data.user
        responseData.session = data.session

        return res.json(responseData)
    } catch (e) {
        responseData.error = e

        res.status(500).json(responseData)
    }
})

app.listen(3000, () => console.log('Server listening on port 3000'))