var TodoItem = React.createClass({
	delete: function() {
	  this.props.delete(this.props.todo);
	},
	
	render: function() {
	  return <li>{this.props.todo}<i onClick={this.delete} className="fa fa-remove"></i></li>
	}
  });
	
  var TodoList = React.createClass({
	
	getInitialState: function() {
	  var initialList = (typeof localStorage["todos"] != "undefined") ? JSON.parse(localStorage.getItem('todos')) : [];
	  
	  return {
		list: initialList,
		inputValue: ''
	  };
	},
	  updateInputValue: function(evt) {
	  this.setState({
		inputValue: evt.target.value
	  });
	},
	
	handleAdd: function() {
	  var todos = this.state.list;
	  var newInput = this.state.inputValue;
	  todos.push(newInput);
	  localStorage.setItem('todos', JSON.stringify(todos));
	  this.setState({ 
		list: todos,
		inputValue: ''
	  });
	},
	 delete: function(todo) {
	  var todos = this.state.list;
	  todos.splice(todos.indexOf(todo), 1);
	  localStorage.setItem('todos',JSON.stringify(todos));
	  this.setState({
		list: todos
	  });
	},
	   render: function() {
		 var listItems = this.state.list.map(function(listValue){ 
			return <TodoItem todo={listValue} delete={this.delete} />
			}.bind(this)); 
	   
		return (
		<div>
		  <h1>My To do list</h1>
		  <ul>{listItems}</ul>
		  <div className="inputBar">
			<input type="text" value={this.state.inputValue} onChange={this.updateInputValue} />
			<button onClick={this.handleAdd}>Add</button>
		  </div>
		</div>
	  );
	}
	
  });
  
  
  ReactDOM.render(<TodoList />,document.getElementById("root"));