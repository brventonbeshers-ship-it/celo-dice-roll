// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CeloDiceRoll {
    uint256 public totalRolls;
    mapping(address => uint256) public userRolls;
    mapping(address => uint256) public userWins;
    mapping(address => uint256) public lastRoll;
    mapping(address => uint256) public lastTarget;

    address[10] public topAddresses;
    uint256[10] public topScores;

    event DiceRolled(
        address indexed player,
        uint256 target,
        uint256 result,
        bool won,
        uint256 userRolls,
        uint256 totalRolls
    );

    function roll(uint256 target) external {
        require(target >= 1 && target <= 6, "target must be 1-6");

        totalRolls += 1;
        userRolls[msg.sender] += 1;

        uint256 result = _random(6) + 1;
        bool won = result == target;

        lastTarget[msg.sender] = target;
        lastRoll[msg.sender] = result;

        if (won) {
            userWins[msg.sender] += 1;
        }

        _updateLeaderboard(msg.sender, userWins[msg.sender]);

        emit DiceRolled(msg.sender, target, result, won, userRolls[msg.sender], totalRolls);
    }

    function getUserStats(address player)
        external
        view
        returns (uint256 rolls, uint256 wins, uint256 latestTarget, uint256 latestRoll)
    {
        return (userRolls[player], userWins[player], lastTarget[player], lastRoll[player]);
    }

    function getLeaderboard() external view returns (address[10] memory, uint256[10] memory) {
        return (topAddresses, topScores);
    }

    function _random(uint256 modulo) internal view returns (uint256) {
        return uint256(
            keccak256(
                abi.encodePacked(blockhash(block.number - 1), block.timestamp, msg.sender, totalRolls)
            )
        ) % modulo;
    }

    function _updateLeaderboard(address user, uint256 score) internal {
        int256 existingIdx = -1;
        for (uint256 i = 0; i < 10; i++) {
            if (topAddresses[i] == user) {
                existingIdx = int256(i);
                topScores[i] = score;
                break;
            }
        }

        if (existingIdx < 0) {
            uint256 minIdx = 0;
            uint256 minScore = topScores[0];
            for (uint256 i = 1; i < 10; i++) {
                if (topScores[i] < minScore) {
                    minScore = topScores[i];
                    minIdx = i;
                }
            }

            if (score > minScore) {
                topAddresses[minIdx] = user;
                topScores[minIdx] = score;
                existingIdx = int256(minIdx);
            }
        }

        if (existingIdx >= 0) {
            uint256 idx = uint256(existingIdx);
            while (idx > 0 && topScores[idx] > topScores[idx - 1]) {
                (topAddresses[idx], topAddresses[idx - 1]) = (topAddresses[idx - 1], topAddresses[idx]);
                (topScores[idx], topScores[idx - 1]) = (topScores[idx - 1], topScores[idx]);
                idx--;
            }
        }
    }
}
