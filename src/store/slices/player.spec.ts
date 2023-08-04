import { describe, expect, it } from 'vitest'
import { PlayerState, next, play, player } from './player'

const exampleState: PlayerState = {
  course: {
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
  },
  isLoading: true,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
}

describe('player slice', () => {
  it('Should be able to play', () => {
    const moduleIndex = 1
    const lessonIndex = 1

    const state = player(exampleState, play({ moduleIndex, lessonIndex }))

    expect(state.currentLessonIndex).toEqual(lessonIndex)
    expect(state.currentModuleIndex).toEqual(moduleIndex)
  })

  it('Should be able to play next video automatically', () => {
    const state = player(exampleState, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('Should be able to jump to the next module automatically', () => {
    const state = player({ ...exampleState, currentLessonIndex: 1 }, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(0)
  })

  it('Should not update the current module index and lession index if there is no next lesson available', () => {
    const state = player(
      { ...exampleState, currentLessonIndex: 1, currentModuleIndex: 1 },
      next(),
    )

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(1)
  })
})
