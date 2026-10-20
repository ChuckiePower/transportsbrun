import type { StaticImageData } from "next/image";

/**
 * Équipe et chauffeurs (section masquée tant que la liste est vide).
 * Photos uniquement avec l'accord des personnes ; fichiers dans content/team/.
 */
export type TeamMember = { name: string; role: string; photo?: StaticImageData };

// TODO(manu): photos et prénoms de l'équipe, avec l'accord de chacun
export const team: TeamMember[] = [];
