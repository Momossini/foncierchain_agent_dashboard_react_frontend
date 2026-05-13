export const ERROR_MESSAGES: Record<string, string> = {
  // Auth errors
  'INVALID_CREDENTIALS': 'Email ou mot de passe incorrect.',
  'USER_NOT_ACTIVE': 'Votre compte est désactivé. Veuillez contacter un administrateur.',
  'TOKEN_EXPIRED': 'Votre session a expiré. Veuillez vous reconnecter.',
  'UNAUTHORIZED': 'Vous n\'êtes pas autorisé à effectuer cette action.',
  'FORBIDDEN': 'Accès refusé. Vous n\'avez pas les permissions nécessaires.',

  // Parcel errors
  'PARCEL_ALREADY_EXISTS': 'Cette parcelle est déjà enregistrée dans le système.',
  'PARCEL_NOT_FOUND': 'La parcelle demandée n\'existe pas.',
  'INVALID_PARCEL_STATUS': 'Le statut actuel de la parcelle ne permet pas cette opération.',
  'OWNER_NOT_FOUND': 'Le propriétaire spécifié n\'a pas été trouvé.',

  // Generic errors
  'INTERNAL_SERVER_ERROR': 'Une erreur interne est survenue. Veuillez réessayer plus tard.',
  'VALIDATION_ERROR': 'Certains champs du formulaire sont invalides.',
  'NETWORK_ERROR': 'Erreur de connexion au serveur. Veuillez vérifier votre connexion internet.',
  'UNKNOWN_ERROR': 'Une erreur inconnue est survenue.',
};

export const getErrorMessage = (code: string | undefined): string => {
  if (!code) return ERROR_MESSAGES.UNKNOWN_ERROR;
  return ERROR_MESSAGES[code] || ERROR_MESSAGES.UNKNOWN_ERROR;
};
