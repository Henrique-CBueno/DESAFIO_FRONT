type EmployeeFormState = {
    id: number
    isActive: boolean;
    name: string;
    gender: "Feminino" | "Masculino" | "";
    cpf: string;
    birthDate: string;
    rg: string;
    role: string;
    usesEPI: boolean;
    activities: { activityName: string; epis: { epi: string; caNumber: string }[] }[];
    healthDoc: { file?: File | null; fileName?: string };
};

type EmployeeFormStateWithID = EmployeeFormState & { id: number };

export const mockUsers: EmployeeFormStateWithID[] = [
    {
        id: 1,
        isActive: true,
        name: "John Doe",
        gender: "Masculino",
        cpf: "12345678901",
        birthDate: "1990-01-01",
        rg: "MG123456",
        role: "Operador",
        usesEPI: true,
        activities: [
            { activityName: "Atividade 1", epis: [{ epi: "Capacete", caNumber: "12345" }] }
        ],
        healthDoc: { file: null, fileName: "" }
    },
    {
        id: 2,
        isActive: false,
        name: "Jane Smith",
        gender: "Feminino",
        cpf: "10987654321",
        birthDate: "1992-05-15",
        rg: "SP987654",
        role: "Técnico",
        usesEPI: false,
        activities: [],
        healthDoc: { file: null, fileName: "" }
    },
    {
        id: 3,
        isActive: true,
        name: "Carlos Silva",
        gender: "Masculino",
        cpf: "12345678907",
        birthDate: "1985-09-10",
        rg: "RJ567890",
        role: "Engenheiro",
        usesEPI: true,
        activities: [
            { activityName: "Manutenção Elétrica", epis: [{ epi: "Luvas", caNumber: "67890" }] }
        ],
        healthDoc: { file: null, fileName: "" }
    },
    {
        id: 4,
        isActive: false,
        name: "Ana Oliveira",
        gender: "Feminino",
        cpf: "10987654328",
        birthDate: "1995-12-20",
        rg: "MG345678",
        role: "Gerente",
        usesEPI: false,
        activities: [],
        healthDoc: { file: null, fileName: "" }
    }
];
