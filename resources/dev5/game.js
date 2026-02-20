// this started as a normal inbox UI but turned into an anxiety thing



const SND_SAVE = "fx_beep";
const SND_DELETE = "fx_shoot7";
const SND_OPEN =  "fx_click";
//consts

const GRID_W = 8;
const GRID_H = 8;

// CoLOROS
const MAIL_BG = PS.makeRGB(210, 200, 150); 
const HEADER = PS.makeRGB(145,140,87);
const BG     = PS.makeRGB(255,249,189);
const ROW_BG = PS.makeRGB(255,252,210);
const DARK   = PS.makeRGB(80,80,80);
const SELECT = PS.makeRGB(210,215,255);
const GREEN  = PS.makeRGB(90, 180, 90);
const RED    = PS.makeRGB(200, 80, 80);

// categories i care about (kinda0)

const IMPORTANT = "important";
const SPAM = "spam";
const UNCLEAR = "unclear";
// what the player actually chose to do (now what i saw)


let messages = [];
let selectedIndex = null;

let savedImportant = 0;
let deletedImportant = 0;
let savedSpam = 0;
let deletedSpam = 0;
let savedUnclear = 0;
let deletedUnclear = 0;


let trackerIndex = 0;

//lil helpies
// i kept this because perlenspiel doesn't have a fill helper
function rect(x1, y1, x2, y2, c) {
	for (let y = y1; y <= y2; y++) {
		for (let x = x1; x <= x2; x++) {
			PS.color(x, y, c);
		}
	}
}


// pick today’s mess

function drawUI() {

rect(0, 1, 7, 7, BG);


rect(0, 2, 7, 7, ROW_BG);

}

function drawInbox() {

	for (let y = 1; y <= 6; y++) {
		for (let x = 0; x <= 7; x++) {
			PS.color(x, y, ROW_BG);
			PS.glyph(x, y, "");
		}
	}

	for (let i = 0; i < 3; i++) {
		let msg = messages[i];
		if (!msg) continue;

let y = 2 + i * 2;


		let rowColor = ROW_BG;
		if (msg.type === IMPORTANT) rowColor = PS.makeRGB(255,245,200);
		if (msg.type === UNCLEAR)   rowColor = PS.makeRGB(235,235,215);
		if (selectedIndex === i)    rowColor = SELECT;

rect(0, y, 7, y, MAIL_BG);

rect(0, y + 1, 7, y + 1, BG);


		PS.glyph(0, y, "★");
		PS.glyphColor(0, y, PS.makeRGB(255,215,0));
		PS.glyphScale(0, y, 120);

		PS.glyph(7, y, "x");
		PS.glyphScale(7, y, 120);

		let s = msg.subject.trim();
		let short = s.length >= 2 ? s.substring(0,2) + ".." : s + "..";

		PS.glyph(3, y, short);
		PS.glyphColor(3, y, DARK);
		PS.glyphScale(3, y, 90);
	}
}


function addTracker(color) {
	if (trackerIndex > 7) return;
	PS.color(trackerIndex, 0, color);
	trackerIndex++;
}



let importantPool = [];
let spamPool = [];
let unclearPool = [];

function buildPools() {

	importantPool = [
		{subject:"Mom called again", del:"I’ll miss her voice when it’s gone.", open:"She just wanted to hear you."},
		{subject:"Doctor follow-up ", del:"Ignoring it won’t make it disappear.", open:"It’s manageable. You caught it early."},
		{subject:"Project deadline moved", del:"You could’ve had breathing room.", open:"An extra week helps more than you admit."},
		{subject:"We need to talk", del:"Some conversations haunt you later.", open:"It’s hard, but not the end."},
		{subject:"Rent confirmation", del:"You’ll worry about this at 3am.", open:"At least that’s settled."},
		{subject:"Missed call from Dad", del:"You don’t know how many calls are left.", open:"He sounds tired. Still glad you answered."},
		{subject:"Therapist availability", del:"You told yourself you didn’t need help.", open:"Maybe you do. And that’s okay."},
		{subject:"Job interview follow-up", del:"You’ll keep wondering ‘what if.’", open:"They liked you more than you thought."},
		{subject:"Overdue notice", del:"Avoidance makes it heavier.", open:"It’s fixable. Still stressful."},
		{subject:"Group project reminder", del:"They’ll notice you disappearing.", open:"At least you’re not letting them down."},
		{subject:"Flight details", del:"You’ll forget until it’s too late.", open:"You’re actually going."},
		{subject:"HR: Please respond", del:"Silence is still an answer.", open:"It wasn’t as bad as you imagined."},
		{subject:"Lab results available", del:"Not knowing hurts differently.", open:"Relief hits slowly."},
		{subject:"Mom: just checking in ", del:"You’ll regret not replying.", open:"She worries because she loves you."},
		{subject:"Team meeting moved earlier", del:"You’ll panic tomorrow morning.", open:"At least you know now."},
		{subject:"Account security alert", del:"You’ll feel stupid later.", open:"Crisis averted."},
		{subject:"Advisor feedback posted", del:"Avoidance isn’t improvement.", open:"Some criticism. Some praise."},
		{subject:"Friend: are you okay?", del:"They’ll stop asking eventually.", open:"You didn’t realize how seen you felt."},
		{subject:"Graduation requirements update", del:"You’ll scramble at the last second.", open:"You’re closer than you think."},
		{subject:"Financial aid revision", del:"Stress compounds.", open:"It’s tight, but survivable."},
		{subject:"Medication refill reminder", del:"You’ll notice when it runs out.", open:"Routine keeps things steady."},
		{subject:"Apartment maintenance scheduled", del:"You’ll forget and feel exposed.", open:"Annoying, but controlled."},
		{subject:"Professor feedback posted", del:"Fear freezes growth.", open:"Not perfect. Not a failure."},
		{subject:"Mom sent photos", del:"Time keeps moving.", open:"You smile without meaning to."},
		{subject:"Emergency contact update", del:"Someone should know.", open:"Prepared feels safer."}
	].map(m => ({...m, type:IMPORTANT}));

	spamPool = [
		{subject:"Lose 20 pounds fast!", del:"You don’t owe anyone a body.", open:"You feel worse than before."},
		{subject:"Crypto opportunity ", del:"You didn’t need another risk.", open:"Regret is immediate."},
		{subject:"Ex viewed your profile", del:"Some doors should stay closed.", open:"Old feelings resurface."},
		{subject:"Productivity hack #47", del:"You’re not broken.", open:"You feel behind."},
		{subject:"Missed delivery scam", del:"You trust yourself.", open:"Why did you click that?"},
		{subject:"Personality test results", del:"You are more than a label.", open:"It doesn’t help."},
		{subject:"Influencer newsletter", del:"Comparison fades.", open:"Everyone looks happier than you."},
		{subject:"Limited time offer", del:"Urgency dissolves.", open:"You feel manipulated."},
		{subject:"Dating app digest", del:"Loneliness doesn’t need reminders.", open:"Swipe fatigue."},
		{subject:"Online course ad", del:"You’re allowed to rest.", open:"Another ‘should.’"},
		{subject:"Debt consolidation ad", del:"Not today.", open:"Anxiety spikes."},
		{subject:"Wellness influencer tip", del:"You don’t need fixing.", open:"Why can’t you do this?"},
		{subject:"Career quiz", del:"You’re still becoming.", open:"More confusion."},
		{subject:"Flash sale ending soon", del:"You keep your money.", open:"Impulse regret."},
		{subject:"Re: you won a prize!", del:"Scams lose power.", open:"Of course it’s fake."},
		{subject:"Motivational quote", del:"Silence is better.", open:"It rings hollow."},
		{subject:"Unsubscribe confirmation", del:"Control feels good.", open:"Why did this exist?"},
		{subject:"Daily news alert", del:"Peace returns.", open:"The world feels heavy."},
		{subject:"Trending outrage story", del:"You protect your energy.", open:"Anger sticks."}
	].map(m => ({...m, type:SPAM}));

	unclearPool = [
		{subject:"Fish🐟", del:"🐟", open:"🐟"},
		{subject:"Unknown sender: hey", del:"You’ll wonder who it was.", open:"It goes nowhere."},
		{subject:"Old draft resurfaced", del:"You bury that version of yourself.", open:"You remember who you were."},
		{subject:"Re: last summer", del:"Closure slips away.", open:"It still hurts."},
		{subject:"Voicemail transcript attached", del:"You avoid pain.", open:"It wasn’t as bad as feared."},
		{subject:"No subject", del:"Silence can be mercy.", open:"Nothing happens. That’s the point."}
	].map(m => ({...m, type:UNCLEAR}));
}




function buildSessionMessages() {
	let session = [];

	let importantCount = PS.random(3) + 1;
	let unclearCount   = PS.random(3) + 1;
	let spamCount = 10 - importantCount - unclearCount;

	function pickAndRemove(pool) {
	let index = PS.random(pool.length) - 1;
	return pool.splice(index, 1)[0];
}


for (let i = 0; i < importantCount; i++) {
	if (importantPool.length > 0) {
		session.push(pickAndRemove(importantPool));
	}
}

for (let i = 0; i < unclearCount; i++) {
	if (unclearPool.length > 0) {
		session.push(pickAndRemove(unclearPool));
	}
}

for (let i = 0; i < spamCount; i++) {
	if (spamPool.length > 0) {
		session.push(pickAndRemove(spamPool));
	}
}


	for (let i = session.length - 1; i > 0; i--) {
		let j = PS.random(i + 1) - 1;
		[session[i], session[j]] = [session[j], session[i]];
	}

	return session;
}



PS.touch = function (x, y) {

	for (let i = 0; i < 3; i++) {
		let rowY = 2 + i * 2;

		if (y !== rowY || !messages[i]) continue;

		selectedIndex = i;

		if (x === 0) handleAction("open");
		else if (x === 7) handleAction("delete");
		else {
			
				PS.audioPlay(SND_OPEN);
			PS.statusText(messages[i].subject);
			drawInbox();
		}
	}
};

function handleAction(action) {
	if (selectedIndex === null) return;

	let msg = messages[selectedIndex];

	if (action === "open") {
		PS.audioPlay(SND_SAVE);
		PS.statusText(msg.open);

		if (msg.type === IMPORTANT) {
			savedImportant++;
			addTracker(GREEN);
		}
		else if (msg.type === SPAM) savedSpam++;
		else if (msg.type === UNCLEAR) savedUnclear++;

	} else { 
		
				PS.audioPlay(SND_DELETE);
		PS.statusText(msg.del);

		if (msg.type === IMPORTANT) {
			deletedImportant++;
			addTracker(RED);
		}
		else if (msg.type === SPAM) deletedSpam++;
		else if (msg.type === UNCLEAR) deletedUnclear++;
	}

	messages.splice(selectedIndex, 1);
	selectedIndex = null;

	if (messages.length === 0) endGame();
	else {
		drawUI();
		drawInbox();
	}
}

if (messages.length !== 0) {
	// shouldn't happen, but just in case
}


// endings aren't about winning, they're about how you avoided or engaged
function determineEnding() {

	const totalImportant = savedImportant + deletedImportant;
	const totalSpam = savedSpam + deletedSpam;

	// deleted everything that actually mattered
	if (totalImportant > 0 && deletedImportant === totalImportant) {
		return "❌ There was more you could have done.";
	}

	// avoided deciding at all
	if (deletedImportant === 0 && deletedSpam === 0) {
		return "📩 You saved everything. Nothing really changed.";
	}

	// did something, not everything
	if (savedImportant >= 2 && deletedSpam >= 1 && savedImportant < totalImportant) {
		return "⭐ You feel a little better.";
	}

	// handled it cleanly
	if (savedImportant === totalImportant && deletedSpam === totalSpam && totalImportant > 0) {
		return "❤️‍🩹 You kept what mattered.";
	}


}






function endGame() {
	rect(0, 0, GRID_W - 1, GRID_H - 1, PS.makeRGB(0,0,0));
	PS.glyph(PS.ALL, PS.ALL, "");
	PS.statusText(determineEnding());
}



PS.init = function () {
	PS.gridSize(GRID_W, GRID_H);
	PS.border(PS.ALL, PS.ALL, 0);
	PS.audioLoad(SND_SAVE);
	PS.audioLoad(SND_DELETE);
	PS.audioLoad(SND_OPEN);
rect(0, 0, 7, 0, HEADER);
	buildPools();
	messages = buildSessionMessages();

	drawUI();
	drawInbox();

	PS.statusText("Inbox (3)");
};
