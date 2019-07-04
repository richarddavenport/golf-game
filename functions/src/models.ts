import * as firebase from 'firebase';

export interface Debug {
    current_round_in_setup: number;
    format_in_schedule_file_name: string;
    last_round_in_setup: number;
    msg_id: string;
    schedule_file_found: boolean;
    schedule_generated: Date;
    setup_file_found: boolean;
    setup_generated: Date;
    setup_year: string;
    tournament_in_schedule_file_found: boolean;
    tournament_in_schedule_file_name: string;
}

export interface Course {
    course_code: string;
    course_id: string;
    course_name: string;
    distance_in: number;
    distance_out: number;
    distance_total: number;
    is_host: boolean;
    par_in: string;
    par_out: string;
    par_total: string;
}

export interface CutLine {
    cut_count: number;
    cut_line_score: number;
    paid_players_making_cut: number;
    projected_count?: any;
    show_cut_line: boolean;
    show_projected: boolean;
}

export interface PlayerDebug {
    found_in_setup_file: boolean;
}

export interface PlayerBio {
    country: string;
    first_name: string;
    is_amateur: boolean;
    is_member: boolean;
    last_name: string;
    short_name: string;
}

export interface Round {
    round_number: number;
    strokes?: any;
    tee_time?: Date;
}

export interface Rankings {
    cup_points?: number;
    cup_rank: string;
    cup_trailing?: number;
    money_proj_rank: string;
    money_start_rank: string;
    points_proj_rank: string;
    points_start_rank: string;
    priority_proj_rank: string;
    priority_proj_sort?: any;
    priority_seed?: any;
    priority_start_rank: string;
    priority_start_sort?: any;
    proj_rank: string;
    proj_sort?: any;
    projected_cup_points_event?: number;
    projected_cup_points_total?: number;
    projected_cup_rank: string;
    projected_money_event: number;
    projected_money_rank: string;
    projected_money_total?: number;
    schwab_proj_rank: string;
    schwab_start_rank: string;
    start_rank: string;
    top25_seed?: any;
}

export interface Player {
    course_hole?: any;
    course_id: string;
    current_position: string;
    current_round: number;
    debug: PlayerDebug;
    group_id: string;
    player_bio: PlayerBio;
    player_id: string;
    rankings: Rankings;
    rounds: Round[];
    start_hole: number;
    start_position: string;
    status: string;
    thru?: any;
    today?: any;
    total_strokes?: any;
    total: number;
}

export interface Leaderboard {
    courses: Course[];
    current_round: number;
    cut_line: CutLine;
    end_date: string;
    in_cup: boolean;
    in_playoff: boolean;
    is_finished: boolean;
    is_started: boolean;
    players: Player[];
    round_state: string;
    scoring_type: string;
    start_date: string;
    total_rounds: number;
    tour_code: string;
    tour_name: string;
    tournament_format: string;
    tournament_id: string;
    tournament_name: string;
}

export interface LeaderboardResponse {
    debug: Debug;
    last_updated: Date;
    time_stamp: string;
    leaderboard: Leaderboard;
}

// @ts-ignore
export interface Firestore {
    tournaments: LeaderboardResponse[];
    users: firebase.User[];
    games: Game[];
}

export interface Game {
    gameName: string;
    gamePlayers: GamePlayer[];
    rules: Rules;
    scoreboard: {
        [uid: string]: Scorecard
    },
    tourName: string;
    tournamentId: string;
    tournamentIsFinished: boolean;
    tournamentIsStarted: boolean;
    tournamentName: string;
    tournamentRoundState: string;
}

export interface Rules {
    pickSamePlayers: boolean;
    top25once: boolean;
}

export interface Scorecard {
    team: Player[];
    score: number;
    user: firebase.User;
}

export interface GamePlayer extends Player {

}
