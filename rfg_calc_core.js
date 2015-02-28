var rfg_calc = {};
(function() {
	// Коллекции
	this.players = [];
	this.tournaments = [];
	this.tournament_players = [];
	this.games = [];
	this.towns = [];

	//Вывод коллекций для экпорта данных
	this.printTownsExport = function () {
		var s = "", i = 0;
		for (; i < this.towns.length; i++) {
			var town = this.towns[i];
			if (s !== "") {
				s += "\n";
			}
			s += "INSERT INTO RFG_TOWNS (ID, NAME, REGID, FOID, VID, TYPE, LASTUPDATE)"
				+ " VALUES ("
					+ town["ID"]+ ",'"
					+ town["Name"].replace(/'/g, "''") + "',"
					+ town["RegID"] + ","
					+ town["FoID"] + ",'"
					+ town["Vid"].replace(/'/g, "''") + "',"
					+ town["Type"] + ",TO_DATE('"
					+ town["LastUpdate"] + "','YYYY-MM-DD'));";
		}
		return s;
	}
	this.printPlayersExport = function () {
		var s = "", i = 0;
		for (; i < this.players.length; i++) {
			var player = this.players[i];
			if (s !== "") {
				s += "\n";
			}
			s += "INSERT INTO RFG_PLAYERS (ID, FAM, IM, FAMLAT, IMLAT, TOWNID, REIT, REITDIN,"
				+ " RANG, OTKL, DELETED, LASTGAME, LASTUPDATE)"
				+ " VALUES ("
					+ player["ID"]+ ",'"
					+ player["Fam"].replace(/'/g, "''")+ "','"
					+ player["Im"].replace(/'/g, "''")+ "','"
					+ player["FamLat"].replace(/'/g, "''")+ "','"
					+ player["ImLat"].replace(/'/g, "''")+ "',"
					+ player["TownID"]+ ","
					+ player["Reit"]+ ","
					+ player["ReitDin"]+ ",'"
					+ player["Rang"]+ "',"
					+ player["Otkl"]+ ","
					+ player["Deleted"]+ ",TO_DATE('"
					+ player["LastGame"]+ "','YYYY-MM-DD'),TO_DATE('"
					+ player["LastUpdate"]+ "','YYYY-MM-DD'));"
		}
		return s;
	}
	this.printTournamentsExport = function () {
		var s = "", i = 0;
		for (; i < this.tournaments.length; i++) {
			var tournament = this.tournaments[i];
			if (s !== "") {
				s += "\n";
			}
			s += "INSERT INTO RFG_TOURNAMENT (ID, NAME, MESTO, NAMELAT, MESTOLAT, SYSTEM,"
				+ " SYSTEMNAME, VID, VIDNAME, NUMBOARD, NUMTUR, NUMTUROL, DATEBEGIN, DATEEND,"
				+ " KOMI4, STATE, VISIBLE, DELETED, LASTUPDATE)"
				+ " VALUES ("
					+ tournament["ID"]+ ",'"
					+ tournament["Name"].replace(/'/g, "''")+ "','"
					+ tournament["Mesto"].replace(/'/g, "''")+ "','"
					+ tournament["NameLat"].replace(/'/g, "''")+ "','"
					+ tournament["MestoLat"].replace(/'/g, "''")+ "',"
					+ tournament["System"]+ ",'"
					+ tournament["SystemName"].replace(/'/g, "''")+ "',"
					+ tournament["Vid"]+ ",'"
					+ tournament["VidName"].replace(/'/g, "''")+ "',"
					+ tournament["NumBoard"]+ ","
					+ tournament["NumTur"]+ ","
					+ tournament["NumTurOl"]+ ",TO_DATE('"
					+ tournament["DateBegin"]+ "','YYYY-MM-DD'),TO_DATE('"
					+ tournament["DateEnd"]+ "','YYYY-MM-DD'),"
					+ tournament["Komi4"]+ ","
					+ tournament["State"]+ ","
					+ tournament["Visible"]+ ","
					+ tournament["Deleted"]+ ",TO_DATE('"
					+ tournament["LastUpdate"]+ "','YYYY-MM-DD'));"
		}
		return s;
	}
	this.printTournamentPlayersExport = function () {
		var s = "", i = 0;
		for (; i < this.tournament_players.length; i++) {
			var player = this.tournament_players[i];
			if (player["TurnirID"] <= 0)
				continue;
			if (s !== "") {
				s += "\n";
			}
			s += "INSERT INTO RFG_TOURNAMENT_PLAYERS (ID, TURNIRID, PLAYERID, TURNVID, FAM,"
				+ " IM, FAMLAT, IMLAT, VID, TOWNID, MM0, MMF4, BUHG4, BERG4, MESTO, MESTOD,"
				+ " REITDIN, REIT0RL, REIT0RLDIN, REITFRL, REITFRLDIN, OTKL0RL, OTKLFRL,"
				+ " STARTNUMBER, COMMNUMBER, LASTGAME)"
				+ " VALUES ("
					+ player["ID"]+ ","
					+ player["TurnirID"]+ ","
					+ player["PlayerID"]+ ","
					+ player["TurnVid"]+ ",'"
					+ player["Fam"].replace(/'/g, "''")+ "','"
					+ player["Im"].replace(/'/g, "''")+ "','"
					+ player["FamLat"].replace(/'/g, "''")+ "','"
					+ player["ImLat"].replace(/'/g, "''")+ "','"
					+ player["Vid"]+ "',"
					+ player["TownID"]+ ","
					+ player["MM0"]+ ","
					+ player["MMF4"]+ ","
					+ player["Buhg4"]+ ","
					+ player["Berg4"]+ ","
					+ player["Mesto"]+ ","
					+ player["MestoD"]+ ","
					+ player["ReitDin"]+ ","
					+ player["Reit0RL"]+ ","
					+ player["Reit0RLDin"]+ ","
					+ player["ReitFRL"]+ ","
					+ player["ReitFRLDin"]+ ","
					+ player["Otkl0RL"]+ ","
					+ player["OtklFRL"]+ ","
					+ player["StartNumber"]+ ","
					+ player["CommNumber"]+ ",TO_DATE('"
					+ player["LastGame"]+ "','YYYY-MM-DD'));"
		}
		return s;
	}
	this.printGamesExport = function () {
		var s = "", i = 0;
		for (; i < this.games.length; i++) {
			var game = this.games[i];
			if (game["TurnirID"] <= 0)
				continue;
			if (s !== "") {
				s += "\n";
			}
			s += "INSERT INTO RFG_GAMES (ID, TURNIRID, TURPLAYER1ID, TURPLAYER2ID, COLOR,"
				+ " GAMEDATE, RESULT, TUR, BOARD, KOMI4, VID)"
				+ " VALUES ("
					+ game["ID"]+ ","
					+ game["TurnirID"]+ ","
					+ game["TurPlayer1ID"]+ ","
					+ game["TurPlayer2ID"]+ ","
					+ game["Color"]+ ",TO_DATE('"
					+ game["GameDate"]+ "','YYYY-MM-DD'),"
					+ game["Result"]+ ","
					+ game["Tur"]+ ","
					+ game["Board"]+ ","
					+ game["Komi4"]+ ","
					+ game["Handicap"]+ ","
					+ game["Vid"]+ ");";
		}
		return s;
	}
}).apply(rfg_calc);