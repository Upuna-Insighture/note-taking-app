const API_URL = process.env.REACT_APP_API_URL + '/notes';                                                                               ;

export const fetchNotes = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error('Error fetching notes');
  }
  return response.json();
};

export const createNote = async (note) => {
  const response = await fetch(`${API_URL}`, {                            
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },                        
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error('Error creating note');
  }
  return response.json();
};

export const updateNote = async (id, note) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error('Error updating note');
  }
  return response.json();
};

export const deleteNote = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting note');
  }
};
