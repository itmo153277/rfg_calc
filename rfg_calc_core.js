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
	//Описание алгоритмов пересчета
	this.algorithms = [
		{
			/*
			2. Корректировка отклонений перед пересчетом. Учет времени неучастия в турнирах
			
			Отклонение S характеризует степень недостоверности рейтинга и поэтому должно
			увеличиваться с ростом времени неучастия игрока в турнирах. Время T неучастия
			учитывается в месяцах, начиная с 31 дня перерыва в выступлениях (т.е. 30 дней с
			момента последнего выступления не засчитываются в этот срок). Формула для нового
			стартового в текущем турнире отклонения ST, учитывающая время неучастия T,
			имеет вид:
				S_T = S · {1 + K · [(S* / S)^2 - 1]}^(1/2),
			где
				S - отклонение на момент завершения последнего (предыдущего) турнира с участием
					данного игрока; 
				S* - максимальное отклонение в РС, определяемое формулой 
				S* = (3000 - R)/10, если R < 2000; иначе 
				S* = 50 · {1 + [(3000 - R)/1000]^2}; 
				K = min {1, 0.001 · (3000 - R) · (T / 24)} - коэффициент, определяющий рост
			неопределенности рейтинга со временем.
			Коррекция отклонений по времени неучастия делается всегда перед всеми расчетами по
			рейтингу в данном турнире и для всех игроков, сыгравших хотя бы одну партию.
			Параметры коррекции по времени выбраны так, что игрок дан-уровня теряет
			достоверность рейтинга за два года, игрок 11 кю теряет достоверность за год,
			игроки ближе к 20 кю – примерно за 8 мес., при этом отклонение достигает
			максимально допустимой величины S*. Чем ближе S к S*, тем быстрее, динамичнее
			изменяется рейтинг игрока и тем меньше влияние его партий на рейтинг других
			игроков. При длительном неучастии (К > 0.5) флаг нестабильности F обнуляется
			(информация о поведении производной теряется).
			*/
			"calculateMaxDev": function (player, tournament) {
				if (player.Rating0 < 2000) {
					player.MaxDev = (3000 - player.Rating0) / 10;
				} else {
					player.MaxDev = 50 * (1 + Math.pow((3000 - player.Rating0) / 1000, 2));
				}
			},
			"getPlayerTime": function(player, tournament) {
				var lastGameD = player.LastGame.split('.'),
					lastGame = new Date(lastGameD[2], lastGameD[1] - 1, lastGameD[0]),
					tDateD = tournament.DateBegin.split('.'),
					tDate = new Date(tDateD[2], tDateD[1] - 1, tDateD[0]),
					diffDays = Math.floor((tDate.getTime() - lastGame.getTime()) /
						24 * 60 * 60 * 1000);
				if (diffDays < 31)
					return 0;
				else
					return (tDate.getFullYear() - lastGame.getFullYear()) * 12 +
						(tDate.getMonth() - lastGame.getMonth());
			},
			"calculateDev": function(player, tournament) {
				var T = this.getPlayerTime(player, tournament);
				if (T == 0) {
					player.Dev0 = player.Dev;
				} else {
					var K = 0.001 * (3000 - player.Rating0) * T / 24;
					if (K > 1)
						K = 1;
					player.Dev0 = player.Dev * (1 + K * Math.sqrt(
						Math.pow(player.MaxDev / player.Dev, 2) - 1));
					if (player.Dev0 > player.MaxDev)
						player.Dev0 = player.MaxDev;
				}
			},
			/*
			3. Базовая схема пересчета рейтингов. Принцип Эло

			Рейтинги и отклонения игроков пересчитываются по итогам каждого рейтингового турнира.
			Пересчет начинающих игроков, не достигших уровня 3 юношеского разряда (рейтинг 300,
			18 кю) производится по упрощённой методике «баланса», излагаемой ниже в пп.6 и 7, а
			здесь изложим методику для игроков от 18 кю и выше, в основу которой положен следующий 

			Принцип А.Эло: Изменение рейтинга пропорционально разнице результата и вероятностного
			прогноза.
			Этот принцип выражается в виде формулы Эло
				DR = R' - R = K_дин · DN,
			где
				R' - рейтинг после турнира; 
				DN - разница между набранными очками и вероятностным прогнозом; 
				K_дин - коэффициент динамичности, являющийся индивидуально вычисляемой функцией
					отклонений рейтингов игрока и его соперников, а также прогнозов результатов в
					каждой из учитываемых встреч:
				K_дин = max{10, S* / [(S* / S)^2 + D_b]}.
			В коэффициент динамичности входят:
				S - текущее отклонение рейтинга игрока (перед турниром, с учетом коррекции
					по времени неучастия, см. п.1), 
				S* - максимальное отклонение,
			а также дисперсия результатов
				D_b = sum{j=1..N, B^2_j · p_j · (1 - p_j)},
			где
				N - число учитываемых партий игрока, 
				B_j – коэффициент неопределенности рейтинга j-того соперника: 
					1 / B^2_j = 1 + 3 · [S_j / (3.141593 · S*_j)]^2, 
				p_j = P(DR_j, D_j) - прогнозы результатов (условные априорные математические
					ожидания набираемых турнирных очков): 
					P(DR, D) = max{0, min {1, 0.5 + DR / D}}; 
				DR_j = B_j · (R - R_j + H_j) - разница в рейтингах с учетом неопределенности
					рейтинга соперника и форы; 
				R_j - рейтинг j-того соперника; 
				H_j - фора, пересчитанная в пункты рейтинга, т.е. Н = 50 (один камень), 150, 250,
					..., 850 (девять камней), причем фора положительна, когда данный игрок ее
					получает, и отрицательна - в противном случае; 
				D_j - среднее квадратичное расстояние рейтингов игрока и соперника от рейтинга
					идеального игрока (3000): 
					D^2_j = 0.5 · [(3000 - R)^2 + (3000 - R_j)^2].
			Разница набранных и ожидаемых очков (DN) также учитывает неопределенность рейтингов и
			имеет вид:
				DN = sum{j=1..N, B_j · (r_j - p_j)},
			где
				rj - результаты партий (0 - поражение, 1 – победа, 0.5 - ничья).
			*/
			"getExpect": function(DR, D) {
				var p = 0.5 + DR / D;
				if (p > 1)
					return 1;
				else if (p < 0)
					return 0;
				else
					return p;
			},
			"calculateRating_Normal": function(player, tournament) {
				var Disp = 0, DN = 0;
				player.gamesAmount = 0;
				for (var i = 0; i < player.opponents.length; i++) {
					var opobj = player.opponents[i];
					if (!opobj.hasOwnProperty("playerIndex"))
						continue;
					var opponent = tournament.players[opobj.playerIndex];
					opobj.CBsq = 1 / (1 + 3 * Math.pow(opponent.Dev0 / 3.141593 / opponent.MaxDev,
						2));
					opobj.CB = Math.sqrt(opobj.CBsq);
					opobj.expect = this.getExpect(opobj.CB * opobj.DR, opobj.DSR)
					Disp += opobj.CBsq * opobj.expect * (1 - opobj.expect);
					if (opobj.hasOwnProperty("result")) {
						opobj.DN = opobj.CB * (opobj.result - opobj.expect)
						DN += opobj.DN;
						player.gamesAmount++;
					} else {
						opobj.DN0 = - opobj.CB * opobj.expect;
						opobj.DN1 = opobj.CB * (1 - opobj.expect);
					}
				}
				player.CDyn = player.MaxDev / (Math.pow(player.MaxDev / player.Dev0, 2) + Disp);
				if (player.CDyn < 10)
					player.CDyn = 10;
				player.RatingF = player.Rating0 + DN * player.CDyn;
			}
		}
	];
}).apply(rfg_calc);