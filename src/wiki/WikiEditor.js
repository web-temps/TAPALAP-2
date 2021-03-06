const __ = require('colors');
const {
    db
} = require('../data/sqlite.config');
const {
    WikiPages
} = require('../wiki/pages');
const pages = new WikiPages();
const pagelist = pages.list;
const Markdown = require('../util/SnooMD');
const md = new Markdown();

const STAR = `★`;
const STAR0 = `☆`;

const generateDirectory = function (page) {
    let links = new Array();
    // If page = current iteration, bold the page in link text
    for (let i = 0; i < pagelist.length; i++) {
        let text = new String(pagelist[i]);
        if (pagelist[i] === page) {
            text = md.apply(text, md.bold);
        }
        const link = md.link(`https://www.reddit.com/r/${process.env.MASTER_SUB}/wiki/${pages.category}/${pagelist[i].toLowerCase()}`, text);
        links.push(link)
    }
    let linkstring = links.join(" |\n ");
    return linkstring.concat("\n\n-----");
}

// Edit Wiki Page
async function editWikiPage(page, requester) {
    console.log("Building new Wiki Page: ".yellow, page);

    // Get the correct page and generate a directory
    let p = page.replace("userdirectory/", "");
    const dir = generateDirectory(p.toUpperCase());

    // Find the correct model for the alphabetized page

    let users = await db.getAllUsersByInitial(page);

    // Generate tables for each user
    const AllTables = [];

    let prev = "";
    const LIMITED_USERS = [];
    for(var i = 0; i < users.length; i++){
        if (users[i].username != prev) {
            LIMITED_USERS.push(users[i]);
            prev = users[i].username;
        }
        
    }


    for (const user of LIMITED_USERS) {
        // Format Username
        const fUsername = `#${user.username}`;
        AllTables.push(fUsername);

        const REVIEWS = await db.getUserReviews(user.username);

        const reviews = [];
        REVIEWS.forEach(review => {
            reviews.push({
                rating: review.rating,
                type: review.type,
                comments: review.comments,
                permalink: review.permalink
            });

        });

        const score = calculateScore(REVIEWS);
        let stars = "";
        let c = 0;
        for (c; c < score; c++) {
            stars += STAR;
        }
        for (c; c < 5; c++) {
            stars += STAR0;
        }

        let fullMessage = stars.concat(`(average score:${score}, total reviews:${REVIEWS.length})`);
        AllTables.push(fullMessage);

        // Push user Table Data

        const t = md.table(["Rating", "Type", "Comments", "Permalink"], reviews);
        AllTables.push(t);



    }





    // Format the data into strings
    let AllTablesString = AllTables.join("\n\n");
    const fullMessage = dir + "\n\n" + AllTablesString;

    // Update the wiki page
    console.log("Committing changes...".magenta);
    let res;
    try {

        res = await requester.getSubreddit(process.env.MASTER_SUB).getWikiPage('userdirectory/' + page).edit({
            reason: `New user data added.`,
            text: fullMessage
        });
    } catch (err) {
        if (err) console.log(err)
        else {
            console.log(res);

        }
    }

}

// Calculate Number of stars.
// Takes in a user and gets the average score
// Returns how many 
const calculateScore = function (reviews) {
    const count = reviews.length;
    let total = 0;
    reviews.forEach(review => {
        total += review.rating;
    });
    return Math.floor(total / count);
}


module.exports = {
    editWikiPage
}