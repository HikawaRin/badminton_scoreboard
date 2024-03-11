export const enum Court { LeftCourt = 0, RightCourt = 1 }

export const enum CourtPosition {
    TopLeft = 0,
    BottomLeft = 1,
    BottomRight = 2,
    TopRight = 3,
}

export class Player {
    public Name = "";
}

export class GameSettings {
    public isSingle: boolean = true;

    public MatchNumber: number = 0;

    public MatchPoint: number = 0;
    public MatchMaxExtendPoint: number = 0;

    public Players: string[] = ["", "", "", ""];
    public InitialScore: number[] = [0, 0];
    public selectOpposite: boolean = false;
    public serverPlayer: number = 0;
    public receiverPlayer: number = 2;
}

export class GameBoard {
    public Settings: GameSettings;
    public Players: Player[];
    public MatchCounter: number = 1;
    public MatchScore: number[] = [0, 0];
    public Score: number[];

    constructor(settings: GameSettings) {
        this.Settings = settings;

        this.Players = settings.Players.map(p => {
            let player = new Player();
            player.Name = p;
            return player;
        });

        this.Score = settings.InitialScore;
    }
}

// Record every match detail in one game
export class UndoLog {
    public MatchNumber: number = 0;
    public Server: number = -1;
    public Receiver: number = -1;
    public ScoreSide: Court = Court.LeftCourt;
    public CurrentPoint: number[] = [0, 0];
    public Court: number[] = [-1, -1, -1, -1];
}

export class Game {
    private isSingle: boolean;
    private board: GameBoard;
    private court: number[] = [-1, -1, -1, -1];
    private serverPosition: CourtPosition;

    public GetPlayer(position: CourtPosition): Player {
        return this.board.Players[this.court[position]];
    }

    public GetServerPosition(): number { return this.serverPosition; }

    public GetReceiverPosition(): number { return (this.serverPosition + 2) % 4; }

    public GetBoard(): GameBoard { return this.board; }

    public GetScore(side: Court): number { return this.board.Score[side]; }

    public IsGameEnd(): boolean {
        let GamePoint = this.board.Settings.MatchNumber;
        let FinishedMatch = this.board.MatchCounter;
        return FinishedMatch > GamePoint;
    }

    public LeftSideGetPoint(): void {
        this.board.Score[Court.LeftCourt]++;
        this.updateCourt(Court.LeftCourt);
    }

    public RightSideGetPoint(): void {
        this.board.Score[Court.RightCourt]++;
        this.updateCourt(Court.RightCourt);
    }

    constructor(settings: GameSettings) {
        this.board = new GameBoard(settings);
        this.isSingle = settings.isSingle;

        let leftSideServe = (settings.serverPlayer < 2) != settings.selectOpposite;
        this.serverPosition = this.evaluateServerPsotion((leftSideServe) ? Court.LeftCourt: Court.RightCourt);
        this.evaluatePlayerPosition(settings.serverPlayer, settings.receiverPlayer);
    }

    private evaluateServerPsotion(side: Court): CourtPosition {
        if (side == Court.LeftCourt) {
            if (this.board.Score[Court.LeftCourt] % 2 == 0) {
                return CourtPosition.BottomLeft;
            } else {
                return CourtPosition.TopLeft;
            }
        } else {
            if (this.board.Score[Court.RightCourt] % 2 == 0) {
                return CourtPosition.TopRight;
            } else {
                return CourtPosition.BottomRight;
            }
        }
    }
    
    private updateCourt(scoringCourt: Court): void {
        let isLeftScoring = (scoringCourt == Court.LeftCourt);
        let server = this.court[this.serverPosition];
        let receiver = this.court[this.GetReceiverPosition()];

        let isLeftServe = (this.serverPosition < CourtPosition.BottomRight);
        if (isLeftServe != isLeftScoring) {
            // Opposite side score change server
            this.serverPosition = this.evaluateServerPsotion((isLeftScoring) ? Court.LeftCourt : Court.RightCourt);

            if (this.isSingle) {
                // Single Game, simple swap server and receiver
                // TODO
            } else {
                // Double Game, player position not changed
                server = this.court[this.serverPosition];
                receiver = this.court[this.GetReceiverPosition()];
            }
        } else {
            // Same side score, server swap position
            this.serverPosition = this.getPartnerPosition(this.serverPosition);

            if (!this.isSingle) {
                // In Single Game, server and receiver keeps the same
                // In Double Game, server side swap position and receiver side keeps the same
                receiver = this.court[this.GetReceiverPosition()];
            }
        }

        this.evaluatePlayerPosition(server, receiver);
    }

    private achieveMatchPoint(side: Court): boolean {
        let MatchPoint = this.board.Settings.MatchPoint;
        let MatchMaxExtendPoint = this.board.Settings.MatchMaxExtendPoint;
        let score = this.board.Score[side];
    
        return true;
    }

    private getPartnerPosition(position: number): number {
        return (position ^ 0x1);
    }

    private getPartnerPlayer(player: number): number {
        return (player ^ 0x1);
    }

    private evaluatePlayerPosition(serverPlayer: number, receiverPlayer: number): void {
        this.court[this.serverPosition] = serverPlayer;
        this.court[this.getPartnerPosition(this.serverPosition)] = this.getPartnerPlayer(serverPlayer);
        this.court[this.GetReceiverPosition()] = receiverPlayer;
        this.court[this.getPartnerPosition(this.GetReceiverPosition())] = this.getPartnerPlayer(receiverPlayer);
    }
}
