/**
 * Arquivo de utilitários gerais da aplicação
 * Contém funções auxiliares reutilizáveis em todo o projeto
 * Foco em manipulação de classes CSS e outras utilidades comuns
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Função utilitária para mesclar classes CSS de forma inteligente
 * Combina as funcionalidades do clsx e tailwind-merge para:
 * - Resolver conflitos de classes do Tailwind
 * - Mesclar classes condicionais
 * - Remover classes duplicadas
 * 
 * @param inputs Array de classes CSS, objetos de condição ou arrays aninhados
 * @returns String com as classes CSS mescladas e otimizadas
 * 
 * @example
 * cn('px-2 py-1', condition && 'text-red', ['bg-blue', 'rounded'])
 * // Retorna: "px-2 py-1 text-red bg-blue rounded"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
