import { combineReducers } from 'redux';
import { sections } from 'Utilities/config/editor.config.js';
import {
    getSkillPointsLeft,
    getPhysicalPointsLeftToAssign,
    getMentalPointsLeftToAssign,
    getTraitPointsLeft,
    getResourcePointsLeft
} from 'Utilities/redux-selectors.js';
import lifepaths from './lifepaths.js';
import stats from './stats';
import skills from './skills';
import traits from './traits';
import attributes from './attributes';
import resources from './resources';
import * as types from "Actions/types.js";

import defaultState from 'Utilities/config/default-state.js';
import mockState from 'Utilities/config/mock-state.js';

const characterName = (state = "", action) => {
    switch (action.type) {
        case types.SET_CHARACTER_NAME:
            return action.name;
        default:
            return state;
    }
}

const selectedRace = (state = defaultState.editor.selectedRace, action) => {
    switch (action.type) {
        case types.SELECT_RACE:
            return action.race;
        default:
            return state;
    }
};

const activeSection = (state = defaultState.editor.activeSection, action) => {
    switch (action.type) {
        case types.SET_ACTIVE_SECTION:
            return action.section;
        default:
            return state;
    }
};

const lockedSections = (state = defaultState.editor.lockedSections, action) => {
    switch (action.type) {
        case types.UPDATE_SECTIONS_LOCK_STATE:
            const editorState = action.state.editor;

            // Stats section lock conditions
            if (editorState.lifepaths.selectedLifepaths.length !== editorState.lifepaths.count) {
                return sections.slice(1);
            }

            // Skills section lock conditions
            const mentalPointsLeft = getMentalPointsLeftToAssign(action.state);
            const physicalPointsLeft = getPhysicalPointsLeftToAssign(action.state);
            const stats = action.state.editor.stats.selectedStats;
            if (
                mentalPointsLeft !== 0
                || physicalPointsLeft !== 0
                || Object.values(stats).some(stat => stat === 0)
            ) {
                return sections.slice(2);
            }

            // Traits section lock conditions
            const skillPointsLeft = getSkillPointsLeft(action.state);
            if (skillPointsLeft.lifepath !== 0 || skillPointsLeft.general !== 0) {
                return sections.slice(3);
            }

            // Attributes & Resources section lock conditions
            const traitPointsLeft = getTraitPointsLeft(action.state);
            if (traitPointsLeft !== 0) {
                return sections.slice(4);
            }

            // Finalize section lock conditions
            const resourcePointsLeft = getResourcePointsLeft(action.state);
            if (resourcePointsLeft !== 0) {
                return sections.slice(6);
            }

            return [];
        default:
            return state;
    }
};

export default combineReducers({
    characterName,
    selectedRace,
    activeSection,
    lockedSections,
    lifepaths,
    stats,
    skills,
    traits,
    attributes,
    resources
});