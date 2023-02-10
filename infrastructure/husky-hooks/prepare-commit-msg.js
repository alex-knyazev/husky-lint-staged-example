/* If message title:
 * * Doesn't start with square brackets []
 * * Doesn't start with Merge branch
 * * Doesn't start with Merge pull request
 * * Doesn't start with #
 * and
 * branch name starts with ${JIRA_TAG}-XXX (e.g. TAG-123-branch-description)
 * then prepend the issue tag to the commit message
 *
 * My awesome commit -> [TAG-123] My awesome commit
 */

const fs = require("fs");

const JIRA_TAG_REGEXP = /\w{3,4}-\d+/i;
const messageFile = process.argv[2];

init();

function init() {
  if (!messageFile) {
    return;
  }

  const commitMessage = getCommitMessage();
  const commitMessageTitle = getCommitMessageTitle(commitMessage);

  if (!commitMessageTitle) {
    throw new Error("Empty commit message title! Please, fill commit message.");
  }

  const messageShouldBeHandled = isMessageShouldBeHandled(commitMessageTitle);

  if (!messageShouldBeHandled) {
    return;
  }

  const issueTagInCommitMessageTitle =
    getIssueTagFromStartOfString(commitMessageTitle);

  if (issueTagInCommitMessageTitle) {
    return;
  }

  const branchName = getBranchName();
  const issueTagInBranchName = getIssueTagFromStartOfString(branchName);

  if (!issueTagInBranchName) {
    return;
  }

  const newMessageTitle = writeIssueTagToCommitMessageTitle({
    commitMessage,
    commitMessageTitle,
    issueTag: issueTagInBranchName,
  });
  console.log("_______________________________________");
  console.log(
    `Issue tag from branch-name was auto-added to commit message. New message title: ${newMessageTitle}`
  );
  console.log("_______________________________________");
}

function getCommitMessage() {
  return fs.readFileSync(messageFile, { encoding: "utf-8" });
}

function getCommitMessageTitle(commitMessage) {
  return commitMessage.split("\n")[0];
}

function getBranchName() {
  return require("child_process")
    .execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" })
    .split("\n")[0];
}

function getIssueTagFromStartOfString(str) {
  const matched = str.match(JIRA_TAG_REGEXP);
  return matched && matched[0];
}

function isMessageShouldBeHandled(str) {
  return (
    !startsWithMergeBranch(str) &&
    !startsWithMergePR(str) &&
    !startsWithHash(str)
  );
}

function startsWithMergeBranch(str) {
  return str.indexOf("Merge branch") === 0;
}
function startsWithMergePR(str) {
  return str.indexOf("Merge pull request") === 0;
}
function startsWithHash(str) {
  return str.indexOf("#") === 0;
}

function writeIssueTagToCommitMessageTitle({
  commitMessage,
  commitMessageTitle,
  issueTag,
}) {
  const messageLines = commitMessage.split("\n");
  messageLines[0] = getCommitMessageTitleWithIssueTag({
    issueTag,
    commitMessageTitle,
  });

  fs.writeFileSync(messageFile, messageLines.join("\n"), {
    encoding: "utf-8",
  });

  return messageLines[0];
}

function getCommitMessageTitleWithIssueTag({ issueTag, commitMessageTitle }) {
  return `${issueTag.toUpperCase()} ${commitMessageTitle}`;
}
