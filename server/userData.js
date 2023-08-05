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
        userData: null,
        error: null
    }

    if (!userId) {
        responseData.error = 'No user ID'

        return res.status(400).json(responseData)
    }

    try {
        const { data, error } = await supabase.from('userData').select().filter('userId', 'eq', userId)

        if (error) {
            responseData.error = error

            return res.status(404).json(responseData)
        }

        responseData.userData = data

        res.json(responseData)
    } catch (e) {
        responseData.error = e

        res.status(500).json(responseData)
    }
})

module.exports = router