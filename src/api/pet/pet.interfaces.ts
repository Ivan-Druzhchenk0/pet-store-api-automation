export type PetStatus = 'available' | 'pending' | 'sold'

export interface PetInterface {
  id?: number
  category?: {
    id: number
    name: string
  }
  name: string
  photoUrls?: string[]
  tags?: {
    id: number
    name: string
  }[]
  status: PetStatus
}
