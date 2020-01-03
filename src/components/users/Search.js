import React, {useState, useContext} from "react"
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

// destructrred from props
const Search = () => {

const githubContext = useContext(GithubContext)
const alertContext = useContext(AlertContext)

// @param1 name of state you want to change
// @Param2 method that will update that state
const [text, setText] = useState('')

const onChange = e => setText(e.target.value)

const onSubmit = e => {
    if(text === '') {
      alertContext.setAlert('Please enter something...', 'light')
    }
    e.preventDefault()
    githubContext.searchUsers(text)
    setText('')
  }
  
    return (
      <div>
        <form onSubmit={onSubmit} className="form"> 
        <input
            type='text'
            name='text'
            placeholder='Search Users'
            value={text}
            onChange={onChange}
        />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {githubContext.users.length > 0 && (
            <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>
                Clear
            </button>
        )}
      </div>
    )
  }

export default Search
