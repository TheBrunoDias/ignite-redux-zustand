import { beforeEach, describe, expect, it } from 'vitest'
import { useStore as store } from '.'

const course = {
  id: 1,
  modules: [
    {
      id: 1,
      title: 'Iniciando com React',
      lessons: [
        { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
        {
          id: 'w-DW4DhDfcw',
          title: 'Estilização do Post',
          duration: '10:05',
        },
      ],
    },
    {
      id: 1,
      title: 'Estrutura da aplicação',
      lessons: [
        {
          id: 'gE48FQXRZ_o',
          title: 'Componente: Comment',
          duration: '13:45',
        },
      ],
    },
  ],
}

const initialState = store.getState()

describe('zustand store', () => {
  beforeEach(() => {
    store.setState(initialState)
  })

  it('Should be able to play', () => {
    const moduleIndex = 1
    const lessonIndex = 1

    const { play } = store.getState()

    play({ lessonIndex, moduleIndex })

    const { currentLessonIndex, currentModuleIndex } = store.getState()

    expect(currentLessonIndex).toEqual(lessonIndex)
    expect(currentModuleIndex).toEqual(moduleIndex)
  })

  it('Should be able to play next video automatically', () => {
    const { next } = store.getState()
    store.setState({ course })

    next()

    const { currentLessonIndex, currentModuleIndex } = store.getState()

    expect(currentModuleIndex).toEqual(0)
    expect(currentLessonIndex).toEqual(1)
  })

  it('Should be able to jump to the next module automatically', () => {
    const { next } = store.getState()
    store.setState({ course, currentLessonIndex: 1 })

    next()

    const { currentLessonIndex, currentModuleIndex } = store.getState()

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(0)
  })

  it('Should not update the current module index and lession index if there is no next lesson available', () => {
    const { next } = store.getState()
    store.setState({ course, currentLessonIndex: 1, currentModuleIndex: 1 })

    next()

    const { currentLessonIndex, currentModuleIndex } = store.getState()

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(1)
  })
})
