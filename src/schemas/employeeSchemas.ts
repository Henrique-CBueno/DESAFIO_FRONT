import { z } from "zod";

export const epiSchema = z.object({
  epi: z.string().min(1, "Selecione um EPI"),
  caNumber: z
    .string()
    .min(1, "Informe o número do CA")
    .regex(/^\d+$/, "O número do CA deve conter apenas dígitos"),
});

export const activitySchema = z.object({
  activityName: z
    .string()
    .min(1, "Selecione uma atividade")
    .refine((value) => value !== "Selecione", { message: "Selecione uma atividade" }),
  epis: z.array(epiSchema).min(1, "Adicione ao menos 1 EPI para esta atividade"),
});

const baseEmployeeSchema = z.object({
  id: z.number().optional(),
  isActive: z.boolean(),
  name: z.string().min(1, "Nome obrigatório"),
  gender: z.enum(["Feminino", "Masculino"], { message: "Selecione um gênero" }),
  cpf: z.string().min(11, "CPF inválido"),
  birthDate: z.string().min(1, "Data de nascimento obrigatória"),
  rg: z.string().min(11, "RG obrigatório"),
  role: z
    .string()
    .min(1, "Selecione um cargo")
    .refine((value) => value !== "Selecione", { message: "Selecione um cargo" }),
  healthDoc: z.object({
    file: z.instanceof(File).optional().nullable(),
    fileName: z.string().optional(),
  }),
});

export const employeeSchema = z.discriminatedUnion("usesEPI", [
  baseEmployeeSchema.extend({
    usesEPI: z.literal(true),
    activities: z.array(activitySchema).min(1, "Adicione ao menos 1 atividade"),
  }),
  baseEmployeeSchema.extend({
    usesEPI: z.literal(false),
    activities: z.array(activitySchema).optional(),
  }),
]);

