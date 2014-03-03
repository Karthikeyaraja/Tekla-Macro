jQuery.githubUser = function(username, callback) {
  jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}

jQuery.fn.loadRepositories = function(username) {
  this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");

  var target = this;
  $.githubUser(username, function(data) {
	var repos = data.data; // JSON Parsing
	sortByName(repos);	
 
	var list = $('<dl/>');
	target.empty().append(list);
	
	$(repos).each(function() 
	{		
		if (this.name != (username.toLowerCase()+'.github.com')) {
		list.append('<article><div><h2><a href="http://github.com/' + username + '/' + this.name + '">' + this.name.replace(/-/g, " ") + '</a></h2></div><p>' + (this.description?(this.description):'No Description Available') + '</p></article>');
		}
	});	
  });
  
  function sortByName(repos) {
	repos.sort(function(a,b) {
	  return a.name - b.name;
	});
  }
};

jQuery.fn.listProjects = function(username) {
  this.html("<span>loading...</span>");

  var target = this;
  $.githubUser(username, function(data) {
	var repos = data.data; // JSON Parsing
	sortByName(repos);	
 
	var list = $('<dl/>');
	target.empty().append(list);
	
	$(repos).each(function() 
	{		
		if (this.name != (username.toLowerCase()+'.github.com')) { }
	});	
  });
  
  function sortByName(repos) {
	repos.sort(function(a,b) {
	  return a.name - b.name;
	});
  }
};