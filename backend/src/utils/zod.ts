import { z } from 'zod'

export const userInputScheam = z.object({
    name     : z.string().optional(),
    email    : z.string(),
    password : z.string().min(6,'password length required min 6 characters')
})

export const taskInputScheam = z.object({
    title    : z.string().min(1,"title cannot be empty"),
    description : z.string()
})
