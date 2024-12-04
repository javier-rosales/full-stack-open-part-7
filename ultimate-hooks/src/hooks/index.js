import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
    inputProps: {
      type,
      value,
      onChange
    }
  }
}

export const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        const data = response.data
        setResources(data)
      })
  }, [])

  const create = resource => {
    axios
      .post(baseUrl, resource)
      .then(response => {
        const data = response.data
        setResources(resources.concat(data))
      })
  }

  const service = {
    create
  }

  return [
    resources,
    service
  ]
}