require('dotenv').config()

const express = require('express')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
)

const router = express.Router()

router.get('/', async (req, res) => {
    const { userId } = req.query

    const responseData = {
        links: null,
        error: null
    }

    if (!userId) {
        responseData.error = 'No user ID'

        return res.status(400).json(responseData)
    }

    try {
        const { data, error } = await supabase.from('userData').select('links').filter('userId', 'eq', userId)

        if (error) {
            responseData.error = error

            return res.status(404).json(responseData)
        }

        responseData.links = data[0].links

        res.json(responseData)
    } catch (e) {
        responseData.error = e

        res.status(500).json(responseData)
    }
})

router.patch('/', async (req, res) => {
    const { userId, links } = req.body

    const responseData = {
        success: false,
        error: null
    }

    if (!userId || !links) {
        responseData.error = 'No user ID'

        return res.status(400).json(responseData)
    }

    try {
        const { error } = await supabase.from('userData').update({ links }).eq('userId', userId)

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