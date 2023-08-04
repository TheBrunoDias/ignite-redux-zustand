import { create } from 'zustand'
import { api } from '../lib/axios'

interface Course {
  id: number
  modules: {
    id: number
    title: string
    lessons: {
      id: string
      title: string
      duration: string
    }[]
  }[]
}

export interface PlayerState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean

  load: () => Promise<void>
  next: () => void
  play: ({
    moduleIndex,
    lessonIndex,
  }: {
    moduleIndex: number
    lessonIndex: number
  }) => void
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: true,

    load: async () => {
      set({ isLoading: true })

      const { data } = await api.get(`/courses/${1}`)

      set({ course: data, isLoading: false })
    },

    play: ({
      moduleIndex,
      lessonIndex,
    }: {
      moduleIndex: number
      lessonIndex: number
    }) => {
      set({ currentLessonIndex: moduleIndex, currentModuleIndex: lessonIndex })
    },
    next: () => {
      const { course, currentLessonIndex, currentModuleIndex } = get()
      const nextLessonIndex = currentLessonIndex + 1
      const currentModule = course?.modules[currentModuleIndex]
      const nextLesson = currentModule?.lessons[nextLessonIndex]

      if (nextLesson) {
        set({ currentLessonIndex: nextLessonIndex })
      } else {
        const nextModuleIndex = currentModuleIndex + 1
        const nextModule = course?.modules[nextModuleIndex]

        if (nextModule) {
          set({ currentLessonIndex: 0, currentModuleIndex: nextModuleIndex })
        }
      }
    },
  }
})

export const useCurrentLesson = () => {
  return useStore((state) => {
    const { currentLessonIndex, currentModuleIndex, course } = state

    const currentModule = course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
}
