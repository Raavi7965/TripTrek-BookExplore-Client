import React, { useState, useEffect } from 'react';
import './GroupAdventurePlanning.css';

const GroupAdventurePlanning = () => {
  // Sample group members - in a real app, this would come from a database or API
  const [groupMembers, setGroupMembers] = useState([
    { id: 1, name: 'You', avatar: '👤' },
    { id: 2, name: 'Alex', avatar: '👩' },
    { id: 3, name: 'Sam', avatar: '👨' },
    { id: 4, name: 'Taylor', avatar: '🧑' }
  ]);
  
  const [newMember, setNewMember] = useState('');
  const [activeTab, setActiveTab] = useState('itinerary');
  const [adventureName, setAdventureName] = useState('Mountain Trek Adventure');
  const [adventureDate, setAdventureDate] = useState('');
  const [adventureLocation, setAdventureLocation] = useState('');
  
  // Itinerary state
  const [itinerary, setItinerary] = useState([
    { id: 1, day: 1, time: '08:00', activity: 'Departure from base camp', completed: false },
    { id: 2, day: 1, time: '12:00', activity: 'Lunch at mountain viewpoint', completed: false },
    { id: 3, day: 1, time: '18:00', activity: 'Set up camp for the night', completed: false }
  ]);
  const [newItineraryItem, setNewItineraryItem] = useState({ day: 1, time: '', activity: '' });
  
  // Tasks state
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Bring tents (2)', assignedTo: 1, completed: true },
    { id: 2, task: 'Prepare food supplies', assignedTo: 2, completed: false },
    { id: 3, task: 'Arrange transportation', assignedTo: 3, completed: false }
  ]);
  const [newTask, setNewTask] = useState({ task: '', assignedTo: 1 });
  
  // Expenses state
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Camping equipment rental', amount: 2500, paidBy: 1, category: 'Equipment' },
    { id: 2, description: 'Food supplies', amount: 1800, paidBy: 2, category: 'Food' },
    { id: 3, description: 'Transportation', amount: 3000, paidBy: 3, category: 'Transport' }
  ]);
  const [newExpense, setNewExpense] = useState({ 
    description: '', 
    amount: '', 
    paidBy: 1, 
    category: 'Other' 
  });
  const [expenseFilter, setExpenseFilter] = useState('all');
  
  // Notes state
  const [notes, setNotes] = useState('Remember to check weather forecast before departure!');
  
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  
  // Calculate per person share
  const perPersonShare = groupMembers.length > 0 ? (totalExpenses / groupMembers.length).toFixed(2) : 0;
  
  // Calculate who owes what
  const calculateBalances = () => {
    const memberTotals = {};
    
    // Initialize totals for each member
    groupMembers.forEach(member => {
      memberTotals[member.id] = { paid: 0, owes: perPersonShare };
    });
    
    // Add up what each person paid
    expenses.forEach(expense => {
      if (memberTotals[expense.paidBy]) {
        memberTotals[expense.paidBy].paid += Number(expense.amount);
      }
    });
    
    // Calculate final balance
    return groupMembers.map(member => {
      const balance = memberTotals[member.id].paid - memberTotals[member.id].owes;
      return {
        id: member.id,
        name: member.name,
        avatar: member.avatar,
        balance
      };
    });
  };
  
  const balances = calculateBalances();
  
  // Add new group member
  const addGroupMember = () => {
    if (newMember.trim() === '') return;
    
    const avatars = ['👤', '👩', '👨', '🧑', '👱', '👧', '👦', '👵', '👴'];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    
    const newMemberId = Math.max(...groupMembers.map(m => m.id), 0) + 1;
    setGroupMembers([
      ...groupMembers,
      { id: newMemberId, name: newMember, avatar: randomAvatar }
    ]);
    setNewMember('');
  };
  
  // Remove group member
  const removeGroupMember = (id) => {
    setGroupMembers(groupMembers.filter(member => member.id !== id));
    
    // Reassign tasks from this member to yourself (id: 1)
    setTasks(tasks.map(task => 
      task.assignedTo === id ? { ...task, assignedTo: 1 } : task
    ));
    
    // Reassign expenses from this member to yourself (id: 1)
    setExpenses(expenses.map(expense => 
      expense.paidBy === id ? { ...expense, paidBy: 1 } : expense
    ));
  };
  
  // Add itinerary item
  const addItineraryItem = () => {
    if (newItineraryItem.activity.trim() === '') return;
    
    const newId = Math.max(...itinerary.map(item => item.id), 0) + 1;
    setItinerary([
      ...itinerary,
      { 
        id: newId, 
        day: newItineraryItem.day, 
        time: newItineraryItem.time, 
        activity: newItineraryItem.activity,
        completed: false
      }
    ]);
    setNewItineraryItem({ day: newItineraryItem.day, time: '', activity: '' });
  };
  
  // Toggle itinerary item completion
  const toggleItineraryCompletion = (id) => {
    setItinerary(itinerary.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };
  
  // Delete itinerary item
  const deleteItineraryItem = (id) => {
    setItinerary(itinerary.filter(item => item.id !== id));
  };
  
  // Add task
  const addTask = () => {
    if (newTask.task.trim() === '') return;
    
    const newId = Math.max(...tasks.map(task => task.id), 0) + 1;
    setTasks([
      ...tasks,
      { id: newId, task: newTask.task, assignedTo: newTask.assignedTo, completed: false }
    ]);
    setNewTask({ task: '', assignedTo: 1 });
  };
  
  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  // Add expense
  const addExpense = () => {
    if (newExpense.description.trim() === '' || newExpense.amount === '') return;
    
    const newId = Math.max(...expenses.map(expense => expense.id), 0) + 1;
    setExpenses([
      ...expenses,
      { 
        id: newId, 
        description: newExpense.description, 
        amount: Number(newExpense.amount), 
        paidBy: newExpense.paidBy,
        category: newExpense.category
      }
    ]);
    setNewExpense({ description: '', amount: '', paidBy: 1, category: 'Other' });
  };
  
  // Delete expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };
  
  // Filter expenses by category
  const filteredExpenses = expenseFilter === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.category === expenseFilter);
  
  // Get expense categories
  const expenseCategories = ['Food', 'Transport', 'Equipment', 'Accommodation', 'Activities', 'Other'];
  
  // Sort itinerary by day and time
  const sortedItinerary = [...itinerary].sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    return a.time.localeCompare(b.time);
  });
  
  // Group itinerary by day
  const itineraryByDay = sortedItinerary.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {});
  
  // Save to local storage
  useEffect(() => {
    const adventureData = {
      name: adventureName,
      date: adventureDate,
      location: adventureLocation,
      groupMembers,
      itinerary,
      tasks,
      expenses,
      notes
    };
    
    localStorage.setItem('adventureData', JSON.stringify(adventureData));
  }, [adventureName, adventureDate, adventureLocation, groupMembers, itinerary, tasks, expenses, notes]);
  
  // Load from local storage
  useEffect(() => {
    const savedData = localStorage.getItem('adventureData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.name) setAdventureName(parsedData.name);
        if (parsedData.date) setAdventureDate(parsedData.date);
        if (parsedData.location) setAdventureLocation(parsedData.location);
        if (parsedData.groupMembers) setGroupMembers(parsedData.groupMembers);
        if (parsedData.itinerary) setItinerary(parsedData.itinerary);
        if (parsedData.tasks) setTasks(parsedData.tasks);
        if (parsedData.expenses) setExpenses(parsedData.expenses);
        if (parsedData.notes) setNotes(parsedData.notes);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);
  
  // Share adventure plan
  const shareAdventure = () => {
    // In a real app, this would generate a shareable link or invite
    alert('Share link generated!');
  };
  
  // Export as PDF
  const exportAsPDF = () => {
    // In a real app, this would generate a PDF
    alert('Success');
  };
  
  return (
    <div className="group-adventure-planning-container">
      <div className="adventure-header">
        <div className="adventure-title-section">
          <input 
            type="text" 
            className="adventure-title-input" 
            value={adventureName} 
            onChange={(e) => setAdventureName(e.target.value)}
            placeholder="Adventure Name"
          />
          <div className="adventure-meta">
            <div className="adventure-meta-item">
              <label>Date:</label>
              <input 
                type="date" 
                value={adventureDate} 
                onChange={(e) => setAdventureDate(e.target.value)}
              />
            </div>
            <div className="adventure-meta-item">
              <label>Location:</label>
              <input 
                type="text" 
                value={adventureLocation} 
                onChange={(e) => setAdventureLocation(e.target.value)}
                placeholder="Adventure location"
              />
            </div>
          </div>
        </div>
        
        <div className="adventure-actions">
          <button className="share-button" onClick={shareAdventure}>
            Share Plan
          </button>
          <button className="export-button" onClick={exportAsPDF}>
            Export PDF
          </button>
        </div>
      </div>
      
      <div className="adventure-group-members">
        <h3>Group Members</h3>
        <div className="group-members-list">
          {groupMembers.map(member => (
            <div key={member.id} className="group-member">
              <div className="member-avatar">{member.avatar}</div>
              <div className="member-name">{member.name}</div>
              {member.id !== 1 && (
                <button 
                  className="remove-member-button" 
                  onClick={() => removeGroupMember(member.id)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <div className="add-member-form">
            <input 
              type="text" 
              value={newMember} 
              onChange={(e) => setNewMember(e.target.value)}
              placeholder="Add new member"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addGroupMember();
                }
              }}
            />
            <button onClick={addGroupMember}>Add</button>
          </div>
        </div>
      </div>
      
      <div className="adventure-tabs">
        <div 
          className={`tab ${activeTab === 'itinerary' ? 'active' : ''}`}
          onClick={() => setActiveTab('itinerary')}
        >
          Itinerary
        </div>
        <div 
          className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </div>
        <div 
          className={`tab ${activeTab === 'expenses' ? 'active' : ''}`}
          onClick={() => setActiveTab('expenses')}
        >
          Expenses
        </div>
        <div 
          className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </div>
      </div>
      
      <div className="adventure-content">
        {/* Itinerary Tab */}
        {activeTab === 'itinerary' && (
          <div className="itinerary-section">
            <div className="section-header">
              <h3>Trip Itinerary</h3>
              <div className="progress-indicator">
                {itinerary.length > 0 ? (
                  <span>
                    {itinerary.filter(item => item.completed).length} of {itinerary.length} completed
                  </span>
                ) : (
                  <span>No items yet</span>
                )}
              </div>
            </div>
            
            <div className="itinerary-days">
              {Object.keys(itineraryByDay).map(day => (
                <div key={day} className="itinerary-day">
                  <h4>Day {day}</h4>
                  <ul className="itinerary-list">
                    {itineraryByDay[day].map(item => (
                      <li key={item.id} className={`itinerary-item ${item.completed ? 'completed' : ''}`}>
                        <div className="item-time">{item.time}</div>
                        <div className="item-content">
                          <div className="item-checkbox" onClick={() => toggleItineraryCompletion(item.id)}>
                            {item.completed ? '✓' : ''}
                          </div>
                          <div className="item-text">{item.activity}</div>
                        </div>
                        <button 
                          className="delete-item-button" 
                          onClick={() => deleteItineraryItem(item.id)}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="add-itinerary-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Day</label>
                  <input 
                    type="number" 
                    min="1"
                    value={newItineraryItem.day}
                    onChange={(e) => setNewItineraryItem({
                      ...newItineraryItem,
                      day: parseInt(e.target.value) || 1
                    })}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input 
                    type="time" 
                    value={newItineraryItem.time}
                    onChange={(e) => setNewItineraryItem({
                      ...newItineraryItem,
                      time: e.target.value
                    })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Activity</label>
                  <input 
                    type="text" 
                    value={newItineraryItem.activity}
                    onChange={(e) => setNewItineraryItem({
                      ...newItineraryItem,
                      activity: e.target.value
                    })}
                    placeholder="Add activity"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addItineraryItem();
                      }
                    }}
                  />
                </div>
                <button onClick={addItineraryItem}>Add</button>
              </div>
            </div>
          </div>
        )}
        
        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="tasks-section">
            <div className="section-header">
              <h3>Task Assignments</h3>
              <div className="progress-indicator">
                {tasks.length > 0 ? (
                  <span>
                    {tasks.filter(task => task.completed).length} of {tasks.length} completed
                  </span>
                ) : (
                  <span>No tasks yet</span>
                )}
              </div>
            </div>
            
            <ul className="tasks-list">
              {tasks.map(task => {
                const assignedMember = groupMembers.find(m => m.id === task.assignedTo);
                return (
                  <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <div className="task-checkbox" onClick={() => toggleTaskCompletion(task.id)}>
                      {task.completed ? '✓' : ''}
                    </div>
                    <div className="task-content">
                      <div className="task-text">{task.task}</div>
                      <div className="task-assignee">
                        <span className="assignee-avatar">{assignedMember?.avatar}</span>
                        <span className="assignee-name">{assignedMember?.name}</span>
                      </div>
                    </div>
                    <button 
                      className="delete-item-button" 
                      onClick={() => deleteTask(task.id)}
                    >
                      ×
                    </button>
                  </li>
                );
              })}
            </ul>
            
            <div className="add-task-form">
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Task</label>
                  <input 
                    type="text" 
                    value={newTask.task}
                    onChange={(e) => setNewTask({
                      ...newTask,
                      task: e.target.value
                    })}
                    placeholder="Add task"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addTask();
                      }
                    }}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Assign to</label>
                  <select 
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({
                      ...newTask,
                      assignedTo: parseInt(e.target.value)
                    })}
                  >
                    {groupMembers.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button onClick={addTask}>Add Task</button>
              </div>
            </div>
          </div>
        )}
        
        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <div className="expenses-section">
            <div className="section-header">
              <h3>Group Expense Tracking</h3>
              <div className="expense-summary">
                <div className="total-expenses">
                  Total: ₹{totalExpenses.toLocaleString()}
                </div>
                <div className="per-person">
                  Per person: ₹{perPersonShare}
                </div>
              </div>
            </div>
            
            <div className="expense-filters">
              <button 
                className={`filter-button ${expenseFilter === 'all' ? 'active' : ''}`}
                onClick={() => setExpenseFilter('all')}
              >
                All
              </button>
              {expenseCategories.map(category => (
                <button 
                  key={category}
                  className={`filter-button ${expenseFilter === category ? 'active' : ''}`}
                  onClick={() => setExpenseFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <ul className="expenses-list">
              {filteredExpenses.map(expense => {
                const paidByMember = groupMembers.find(m => m.id === expense.paidBy);
                return (
                  <li key={expense.id} className="expense-item">
                    <div className="expense-category">{expense.category}</div>
                    <div className="expense-content">
                      <div className="expense-description">{expense.description}</div>
                      <div className="expense-details">
                        <div className="expense-amount">₹{expense.amount.toLocaleString()}</div>
                        <div className="expense-paid-by">
                          <span className="paid-by-avatar">{paidByMember?.avatar}</span>
                          <span className="paid-by-text">Paid by {paidByMember?.name}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      className="delete-item-button" 
                      onClick={() => deleteExpense(expense.id)}
                    >
                      ×
                    </button>
                  </li>
                );
              })}
            </ul>
            
            <div className="add-expense-form">
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Description</label>
                  <input 
                    type="text" 
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({
                      ...newExpense,
                      description: e.target.value
                    })}
                    placeholder="Expense description"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Amount (₹)</label>
                  <input 
                    type="number" 
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({
                      ...newExpense,
                      amount: e.target.value
                    })}
                    placeholder="Amount"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addExpense();
                      }
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({
                      ...newExpense,
                      category: e.target.value
                    })}
                  >
                    {expenseCategories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Paid by</label>
                  <select 
                    value={newExpense.paidBy}
                    onChange={(e) => setNewExpense({
                      ...newExpense,
                      paidBy: parseInt(e.target.value)
                    })}
                  >
                    {groupMembers.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button onClick={addExpense}>Add</button>
              </div>
            </div>
            
            <div className="expense-balances">
              <h4>Settlement Summary</h4>
              <ul className="balances-list">
                {balances.map(balance => (
                  <li key={balance.id} className="balance-item">
                    <div className="balance-person">
                      <span className="balance-avatar">{balance.avatar}</span>
                      <span className="balance-name">{balance.name}</span>
                    </div>
                    <div className={`balance-amount ${balance.balance > 0 ? 'positive' : balance.balance < 0 ? 'negative' : ''}`}>
                      {balance.balance > 0 ? 
                        `Gets back ₹${Math.abs(balance.balance).toFixed(2)}` : 
                        balance.balance < 0 ? 
                        `Owes ₹${Math.abs(balance.balance).toFixed(2)}` : 
                        'Settled'}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="notes-section">
            <div className="section-header">
              <h3>Adventure Notes</h3>
            </div>
            
            <textarea 
              className="notes-textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes, reminders, or important information about the trip..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupAdventurePlanning;
