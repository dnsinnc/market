
export const animText = {
   hidden: {
      x: -200,
      opacity: 0,
   },
   visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 }
   })
}

export const animLeftText = {
   hidden: {
      x: -200,
      opacity: 0,
   },
   visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 }
   })
}

export const animRightText = {
   hidden: {
      x: 200,
      opacity: 0,
   },
   visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 }
   })
}


export const upAnimText = {
   hidden: {
      y: 200,
      opacity: 0,
   },
   visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.3 },

   })
}

export const downAnimText = {
   hidden: {
      y: -200,
      opacity: 0,
   },
   visible: (custom: number) => ({

      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 },

   })
}