require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
)

const router = express.Router()

router.use(express.json())
router.use(cors())

router.get('/', async (req, res) => {
    const { userId } = req.query

    const responseData = {
        userInfo: null,
        error: null
    }

    if (!userId) {
        responseData.error = 'No user ID'

        return res.status(400).json(responseData)
    }

    try {
        const {
            data,
            error
        } = await supabase
            .from('userData')
            .select('firstName, lastName, email, profileImg')
            .filter('userId', 'eq', userId)

        if (error) {
            responseData.error = error

            return res.status(404).json(responseData)
        }

        const {
            firstName,
            lastName,
            email,
            profileImg
        } = data[0]

        responseData.userInfo = {
            firstName,
            lastName,
            email,
            profileImg
        }

        res.json(responseData)
    } catch (e) {
        responseData.error = e

        res.status(500).json(responseData)
    }
})

router.patch('/', async (req, res) => {
    const { userId, userInfo } = req.body

    const responseData = {
        success: false,
        error: null
    }

    if (!userId || !userInfo) {
        responseData.error = 'Missing user information'

        return res.status(400).json(responseData)
    }

    try {
        const {
            firstName,
            lastName,
            email,
            profileImg
        } = userInfo

        const {
            error
        } = await supabase
            .from('userData')
            .update({ firstName, lastName, email, profileImg })
            .eq('userId', userId)

        if (error) {
            responseData.error = error

            return res.status(404).json(responseData)
        }

        responseData.success = true

        res.json(responseData)
    } catch (e) {
        responseData.error = e

        res.status(500).json(responseData)
    }
})

module.exports = router