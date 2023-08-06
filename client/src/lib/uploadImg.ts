import { supabase } from "../supabase/supabaseInit"

export const uploadImg = async (userId: string, img: File) => {
    if (!userId || !img) {
        return null
    }

    try {
        const { data, error } = await supabase.storage.from('profile-images').upload(userId + crypto.randomUUID(), img)

        if (error || !data) {
            return null
        }

        const { path } = data

        const { publicUrl } = supabase.storage.from('profile-images').getPublicUrl(path).data

        return publicUrl
    } catch (e) {
        return null
    }
}