app.factory('matchService',function($http){

  var players = [];

  var current_indi_batsmen = [];
  var current_indi_bowlers = [];

  var match = [];

  var batting_team = [];
  var bowling_team = [];

  var factory = {};

  factory.fetchPlayers = function() {
        var defer = $q.defer();

        $http.get('Json/players.json')
            .success(function(data) {
                angular.extend(factory, data);
                defer.resolve();
            })
            .error(function() {
                defer.reject('could not find player.json');
            });

        return defer.promise;
    }

  factory.insertMatch = function(teamOne, teamTwo, toss, batting, totalPlayers, totalOvers){
    var match_id = this.getGUID();
    var team_one_id = this.getGUID();
    var team_two_id = this.getGUID();
    if(teamOne == batting) {
      first_batting = teamOne;
      first_bowling = teamTwo;
      first_batting_teamId = team_one_id;
      first_bowling_teamId = team_two_id;
    }else {
      first_bowling = teamOne;
      first_batting = teamTwo;
      first_batting_teamId = team_two_id;
      first_bowling_teamId = team_one_id;
    }
    match.push({
      matchId: match_id,
      teamOneId: team_one_id,
      teamOne: teamOne,
      teamTwoId: team_two_id,
      teamTwo: teamTwo,
      toss: toss,
      firstBatting: first_batting,
      firstBowling: first_bowling,
      firstBattingTeamId: first_batting_teamId,
      firstBowlingTeamId: first_bowling_teamId,
      firstInningsRuns: 0,
      secondInningsRuns: 0,
      firstInningsBalls: 0,
      secondInningsBalls: 0,
      firstInningsWkts: 0,
      secondInningsWkts: 0,
      winner:'',
      totalPlayer: totalPlayers,
      totalOvers: totalOvers,
    });

    for(var i=1;i<=totalPlayers;i++) {
      batsman_id = this.getGUID();
      bowler_id = this.getGUID();
      batsman_data = {
        id:i,
        playerId:batsman_id,
        playerName:'Player#'+i,
        teamId:first_batting_teamId,
        teamName:first_batting,
        out: false,
        battingRuns:0,
        battingBalls:0,
        battingFours:0,
        battingSixes:0,
        battingStrikeRate: 0,
        bowlingBalls: 0,
        bowlingOvers: 0,
        bowlingRuns: 0,
        bowlingWkts: 0,
        bowlingWides: 0,
        bowlingNoBalls: 0,
        bowlingEconomyRate: 0,
        bowlingStrikeRate: 0,
      };
      bowler_data = {
        id:i,
        playerId:bowler_id,
        playerName:'Player#'+i,
        teamId:first_bowling_teamId,
        teamName:first_bowling,
        out: false,
        battingRuns:0,
        battingBalls:0,
        battingFours:0,
        battingSixes:0,
        battingStrikeRate: 0,
        bowlingBalls: 0,
        bowlingOvers: 0,
        bowlingRuns: 0,
        bowlingWkts: 0,
        bowlingWides: 0,
        bowlingNoBalls: 0,
        bowlingEconomyRate: 0,
        bowlingStrikeRate: 0,
      };
      batting_team.push(batsman_data);
      bowling_team.push(bowler_data);
    }
    players.push(batting_team,bowling_team);
    this.insertBatsman();
    this.insertStriker();
    this.insertBowler();
  }

  factory.insertBatsman = function(){
    var new_batsman = {
       class: 'current-batsman-name',
       playerId: players[0][1].playerId,
       name: players[0][1].playerName,
       runs: players[0][0].battingRuns,
       balls: players[0][0].battingBalls,
       fours: players[0][0].battingFours,
       sixes: players[0][0].battingSixes,
       out: players[0][0].out,
       strike_rate: players[0][0].battingStrikeRate,
    };
    current_indi_batsmen.unshift(new_batsman);
  }

  factory.insertStriker = function(){
    var new_batsman = {
       class: 'non-striker-name',
       playerId: players[1][0].playerId,
       name: players[1][0].playerName,
       runs: players[0][1].battingRuns,
       balls: players[0][1].battingBalls,
       fours: players[0][1].battingFours,
       sixes: players[0][1].battingSixes,
       out: players[0][1].out,
       strike_rate: players[0][1].battingStrikeRate,
    };
    current_indi_batsmen.unshift(new_batsman);
  }

  factory.insertBowler = function(){
    var bowler_data = {
       class: 'current-bowler-name',
       playerId: players[1][0].playerId,
       name: players[1][0].playerName,
       runs: players[1][0].bowlingRuns,
       balls: players[1][0].bowlingBalls,
       overs: players[1][0].bowlingOvers,
       wks: players[1][0].bowlingWkts,
       wides: players[1][0].bowlingWides,
       noballs : players[1][0].bowlingNoBalls,
       economy_rate : players[1][0].bowlingEconomyRate,
       strike_rate: players[1][0].bowlingStrikeRate,
    };
    current_indi_bowlers.unshift(bowler_data);
  }

  factory.getCurrentIndiBatsmen = function(){
    return current_indi_batsmen;
  }

  factory.getCurrentIndiBowlers = function(){
    return current_indi_bowlers;
  }

  factory.setCurrentIndiBatsmen = function(current_indi_batsmen){
    this.current_indi_batsmen = current_indi_batsmen;
  }

  factory.setCurrentIndiBowlers = function(current_indi_bowlers){
    this.current_indi_bowlers = current_indi_bowlers;
  }

  factory.getPlayers = function(){
    return players;
  };

  factory.getTeams = function(){
    return ['teamOne','teamTwo'];
  }

  factory.deletePlayer = function(id){

  };

  factory.getMatchDetails = function(){
    return match;
  }

  factory.getMatchId = function(){
    return match;
  }

  factory.getGUID = function(){
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  };

  factory.s4 = function(){
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return factory;
});
