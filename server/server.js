require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')

const linksRouter = require('./links')

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
)

const app = express()

app.use(express.json())
app.use(cors())

app.use('/links', linksRouter)

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
            responseData.error = error

            return res.json(responseData)
        }

        responseData.user = data.user
        responseData.session = data.session

        return res.status(201).json(responseData)
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
            responseData.error = error

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