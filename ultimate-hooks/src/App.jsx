import { useField, useResource } from './hooks/index'

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3001/notes')
  const [people, personService] = useResource('http://localhost:3001/people')

  const handleNoteSubmit = event => {
    event.preventDefault()
    noteService.create({
      content: content.value
    })
    content.reset()
  }
 
  const handlePersonSubmit = event => {
    event.preventDefault()
    personService.create({
      name: name.value,
      number: number.value
    })
    name.reset()
    number.reset()
  }

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.inputProps} />
        <button>Create</button>
      </form>
      {notes.map(note =>
        <p key={note.id}>
          {note.content}
        </p>
      )}

      <h2>People</h2>
      <form onSubmit={handlePersonSubmit}>
        name
        <input {...name.inputProps} />
        <br/>
        number
        <input {...number.inputProps} />
        <br />
        <button>Create</button>
      </form>
      {people.map(person =>
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      )}
    </div>
  )
}

export default App