/**
 * Validation utilities composable
 * @description Provides reusable validation functions for forms and data
 */
export const useValidation = () => {
  // =====================================
  // EMAIL VALIDATION
  // =====================================
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  const isValidEmail = (email: string): boolean => {
    return emailRegex.test(email.trim())
  }

  // =====================================
  // PHONE VALIDATION
  // =====================================
  
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
  
  const isValidPhone = (phone: string): boolean => {
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  // =====================================
  // COMMON VALIDATIONS
  // =====================================
  
  const isRequired = (value: unknown): boolean => {
    if (value === null || value === undefined) return false
    if (typeof value === 'string') return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    return Boolean(value)
  }

  const minLength = (value: string, min: number): boolean => {
    return value.trim().length >= min
  }

  const maxLength = (value: string, max: number): boolean => {
    return value.trim().length <= max
  }

  const isPositiveNumber = (value: number): boolean => {
    return typeof value === 'number' && value > 0 && !isNaN(value)
  }

  const isValidDate = (date: string): boolean => {
    const parsedDate = new Date(date)
    return !isNaN(parsedDate.getTime()) && parsedDate > new Date()
  }

  // =====================================
  // FORM VALIDATION SCHEMAS
  // =====================================
  
  interface ValidationRule {
    test: (value: unknown) => boolean
    message: string
  }

  interface ValidationSchema {
    [key: string]: ValidationRule[]
  }

  const validateField = (value: unknown, rules: ValidationRule[]): string[] => {
    const errors: string[] = []
    
    for (const rule of rules) {
      if (!rule.test(value)) {
        errors.push(rule.message)
      }
    }
    
    return errors
  }

  const validateForm = (data: Record<string, unknown>, schema: ValidationSchema): Record<string, string[]> => {
    const errors: Record<string, string[]> = {}
    
    for (const [field, rules] of Object.entries(schema)) {
      const fieldErrors = validateField(data[field], rules)
      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors
      }
    }
    
    return errors
  }

  // =====================================
  // PREDEFINED SCHEMAS
  // =====================================
  
  const contactFormSchema: ValidationSchema = {
    name: [
      { test: isRequired, message: 'Le nom est requis' },
      { test: (v) => minLength(v as string, 2), message: 'Le nom doit contenir au moins 2 caractères' }
    ],
    email: [
      { test: isRequired, message: 'L\'email est requis' },
      { test: (v) => isValidEmail(v as string), message: 'L\'email doit être valide' }
    ],
    phone: [
      { test: (v) => !v || isValidPhone(v as string), message: 'Le téléphone doit être valide' }
    ],
    message: [
      { test: isRequired, message: 'Le message est requis' },
      { test: (v) => minLength(v as string, 10), message: 'Le message doit contenir au moins 10 caractères' }
    ]
  }

  const eventFormSchema: ValidationSchema = {
    ...contactFormSchema,
    eventDate: [
      { test: isRequired, message: 'La date de l\'événement est requise' },
      { test: (v) => isValidDate(v as string), message: 'La date doit être dans le futur' }
    ],
    estimatedGuests: [
      { test: isRequired, message: 'Le nombre d\'invités est requis' },
      { test: (v) => isPositiveNumber(v as number), message: 'Le nombre d\'invités doit être positif' }
    ]
  }

  // =====================================
  // REACTIVE VALIDATION
  // =====================================
  
  const useFormValidation = <T extends Record<string, unknown>>(
    initialData: T,
    schema: ValidationSchema
  ) => {
    const formData = ref<T>({ ...initialData })
    const errors = ref<Record<string, string[]>>({})
    const touched = ref<Record<string, boolean>>({})

    const validateSingleField = (field: string) => {
      const fieldErrors = validateField(formData.value[field], schema[field] || [])
      if (fieldErrors.length > 0) {
        errors.value[field] = fieldErrors
      } else {
        delete errors.value[field]
      }
    }

    const validateAllFields = () => {
      errors.value = validateForm(formData.value, schema)
      return Object.keys(errors.value).length === 0
    }

    const touchField = (field: string) => {
      touched.value[field] = true
      validateSingleField(field)
    }

    const reset = () => {
      formData.value = { ...initialData }
      errors.value = {}
      touched.value = {}
    }

    const isValid = computed(() => Object.keys(errors.value).length === 0)
    const hasErrors = computed(() => Object.keys(errors.value).length > 0)

    return {
      formData,
      errors: readonly(errors),
      touched: readonly(touched),
      isValid,
      hasErrors,
      validateSingleField,
      validateAllFields,
      touchField,
      reset
    }
  }

  return {
    // Basic validations
    isValidEmail,
    isValidPhone,
    isRequired,
    minLength,
    maxLength,
    isPositiveNumber,
    isValidDate,
    
    // Schema validation
    validateField,
    validateForm,
    
    // Predefined schemas
    contactFormSchema,
    eventFormSchema,
    
    // Reactive validation
    useFormValidation
  }
}
