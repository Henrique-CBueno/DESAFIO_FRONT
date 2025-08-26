type user = {
    id: number
    name: string
    cpf: number
    role: string
    isActive: boolean
}

export const mockUsers: user[] = [
    {
        id: 1,
        name: "John Doe",
        cpf: 12345678901,
        role: "cargo 1",
        isActive: true
    },
    {
        id: 2,
        name: "Jane Smith",
        cpf: 10987654321,
        role: "cargo 2",
        isActive: false
    },
    {
        id: 3,
        name: "John Doe",
        cpf: 12345678907,
        role: "cargo 3",
        isActive: true
    },
    {
        id: 4,
        name: "Jane Smith",
        cpf: 10987654328,
        role: "cargo 4",
        isActive: false
    }
]