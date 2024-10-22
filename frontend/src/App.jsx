import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import ContactForm from './ContactForm'
import './App.css'

function App() {

  const [contacts, setContacts] = useState([])
  const [currentContact, setCurrentContact] = useState({})
  const [isModelOpen, setsIsModelOpen] = useState(false)

  useEffect( () => {
    fetchContacts()
  }, [])

  const closeWindow = () => {
    setsIsModelOpen(false)
    setCurrentContact({})
  }
  
  const openCreateWindow = () => {
    if (!isModelOpen) {
      setsIsModelOpen(true)
    }
  }

  const openEditWindow = (contact) => {
    if (isModelOpen) return
    setCurrentContact(contact)
    setsIsModelOpen(true)
  }

  const fetchContacts = async () => {
    const response = await fetch("http://localhost:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  }

  const onUpdate = () => {
    closeWindow()
    fetchContacts()
  }

  const deleteContact = async (id) => {
    try{

        const options = {
            method: "DELETE"
        }
        
        const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)

        if (response.status === 200){
            onUpdate()
        } else {
            console.error("Failed to delete.")
        }


    } catch (error) {
        alert(error)

    }
}

  return <>
    <ContactList contacts={contacts} updateContact={openEditWindow} updateCallback={onUpdate} deleteContact={deleteContact}/>
    <button onClick={openCreateWindow}>Create New Contact</button>
 
    {
      isModelOpen && <div className="modal">
        <div className="modal-content">
          <span className='close' onClick={closeWindow}>
            &times;
          </span>
          <ContactForm existingContact={currentContact}/>
        </div>
      </div>
    }

  </>
  
}

export default App
