import * as bcrypt from 'bcrypt'

export const encriptPassword = async (password) => {
    const saltOrRounds = 10
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash
}

export const decriptPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}