import bcrypt from 'bcrypt'

export async function hashPassword(password: string) {
  const teste = await bcrypt.genSalt(10)

  return await bcrypt.hash(password, teste)
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}
