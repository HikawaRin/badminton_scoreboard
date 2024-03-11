import { Game, GameSettings, CourtPosition, Court } from './Game';

let settings: GameSettings = new GameSettings();

it('Test double game score change', () => {
    settings.isSingle = false;
    settings.Players = ["A1", "A2", "B1", "B2"];
    settings.InitialScore = [0, 0];
    settings.selectOpposite = false;
    settings.serverPlayer = 0; // A1 serve
    settings.receiverPlayer = 2; // B1 receive

    let match = new Game(settings);
    expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A1");
    expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B1");
    expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A1");
    expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A2");
    expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B1");
    expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B2");

    // right side score
    match.RightSideGetPoint();
    expect(match.GetBoard().Score[Court.RightCourt]).toBe(1);
    expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B2");
    expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A2");
    expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A1");
    expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A2");
    expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B1");
    expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B2");

    // right side score again
    match.RightSideGetPoint();
    expect(match.GetBoard().Score[Court.RightCourt]).toBe(2);
    expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B2");
    expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A1");
    expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A1");
    expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A2");
    expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B2");
    expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B1");

    // left side score
    match.LeftSideGetPoint();
    expect(match.GetBoard().Score[Court.LeftCourt]).toBe(1);
    expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A2");
    expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B1");
    expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A1");
    expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A2");
    expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B2");
    expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B1");

    // left side score again
    match.LeftSideGetPoint();
    expect(match.GetBoard().Score[Court.LeftCourt]).toBe(2);
    expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A2");
    expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B2");
    expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A2");
    expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A1");
    expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B2");
    expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B1");
});

it('Test double game initilize', () => {
    settings.isSingle = false;
    settings.Players = ["A1", "A2", "B1", "B2"];
    settings.InitialScore = [0, 0];

    // not change side
    settings.selectOpposite = false;
    settings.serverPlayer = 0; // A1 serve
    settings.receiverPlayer = 2; // B1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B2");
    }

    settings.serverPlayer = 1; // A2 serve
    settings.receiverPlayer = 2; // B1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A2");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B2");
    }

    settings.serverPlayer = 0; // A1 serve
    settings.receiverPlayer = 3; // B2 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B1");
    }

    settings.serverPlayer = 2; // B1 serve
    settings.receiverPlayer = 0; // A1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B2");
    }

    settings.serverPlayer = 2; // B1 serve
    settings.receiverPlayer = 1; // A2 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B2");
    }

    settings.serverPlayer = 3; // B2 serve
    settings.receiverPlayer = 0; // A1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B2");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B1");
    }

    // change side
    settings.selectOpposite = true;
    settings.serverPlayer = 0; // A1 serve
    settings.receiverPlayer = 2; // B1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("A2");
    }

    settings.serverPlayer = 1; // A2 serve
    settings.receiverPlayer = 2; // B1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A2");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("A1");
    }

    settings.serverPlayer = 0; // A1 serve
    settings.receiverPlayer = 3; // B2 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("A2");
    }

    settings.serverPlayer = 2; // B1 serve
    settings.receiverPlayer = 0; // A1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("A2");
    }

    settings.serverPlayer = 2; // B1 serve
    settings.receiverPlayer = 1; // A2 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("A1");
    }

    settings.serverPlayer = 3; // B2 serve
    settings.receiverPlayer = 0; // A1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B2");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("A2");
    }

    // Start from 5:5
    settings.InitialScore = [5, 5];

    // not change side
    settings.selectOpposite = false;
    settings.serverPlayer = 0; // A1 serve
    settings.receiverPlayer = 2; // B1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B1");
    }

    settings.serverPlayer = 1; // A2 serve
    settings.receiverPlayer = 2; // B1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A2");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B1");
    }

    settings.serverPlayer = 0; // A1 serve
    settings.receiverPlayer = 3; // B2 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B2");
    }

    settings.serverPlayer = 2; // B1 serve
    settings.receiverPlayer = 0; // A1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B1");
    }

    settings.serverPlayer = 2; // B1 serve
    settings.receiverPlayer = 1; // A2 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B1");
    }

    settings.serverPlayer = 3; // B2 serve
    settings.receiverPlayer = 0; // A1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B2");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("B2");
    }

    // change side
    settings.selectOpposite = true;
    settings.serverPlayer = 0; // A1 serve
    settings.receiverPlayer = 2; // B1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("A1");
    }

    settings.serverPlayer = 1; // A2 serve
    settings.receiverPlayer = 2; // B1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A2");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("A2");
    }

    settings.serverPlayer = 0; // A1 serve
    settings.receiverPlayer = 3; // B2 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("A1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("A1");
    }

    settings.serverPlayer = 2; // B1 serve
    settings.receiverPlayer = 0; // A1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("A1");
    }

    settings.serverPlayer = 2; // B1 serve
    settings.receiverPlayer = 1; // A2 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B1");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("A2");
    }

    settings.serverPlayer = 3; // B2 serve
    settings.receiverPlayer = 0; // A1 receive
    {
        let match = new Game(settings);
        expect(match.GetPlayer(match.GetServerPosition()).Name).toBe("B2");
        expect(match.GetPlayer(match.GetReceiverPosition()).Name).toBe("A1");
        expect(match.GetPlayer(CourtPosition.BottomLeft).Name).toBe("B1");
        expect(match.GetPlayer(CourtPosition.TopLeft).Name).toBe("B2");
        expect(match.GetPlayer(CourtPosition.TopRight).Name).toBe("A2");
        expect(match.GetPlayer(CourtPosition.BottomRight).Name).toBe("A1");
    }
});
