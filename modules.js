/*
  action param properties:
  {
    type: 'someconst',
    payload: {
      data
    }
  }
*/

const PRESS_NUM = 'PRESS_NUM';
const ENTER = 'ENTER';
const OPERATION = 'OPERATION';
const CLEAR = 'CLEAR';
const SWAP = 'SWAP';
const TOGGLE_NEGATIVE = 'TOGGLE_NEGATIVE';

// action
export const pressNum = num => ({
  type: PRESS_NUM,
  payload: num,
});

export const enter = () => ({
  type: ENTER,
});

export const operation = op => ({
  type: OPERATION,
  payload: op,
});

export const clear = () => ({
  type: CLEAR,
});

export const swap = () => ({
  type: SWAP,
});

export const toggleNegative = idx => ({
  type: TOGGLE_NEGATIVE,
  payload: idx,
});

const doOperation = (x, y, op) => {
  const a = parseFloat(x);
  const b = parseFloat(y);
  if (op === 'pow') {
    return b ** a;
  } else if (op === '+') {
    return b + a;
  } else if (op === '-') {
    return b - a;
  } else if (op === 'X') {
    return b * a;
  } else if (op === '/') {
    return b / a;
  }
  return 0;
};

const initialState = { stack: [], inputState: 'replace' };

const switchNegative = (x) => {
  if (x.startsWith('-')) {
    return x.slice(1);
  } return `-${x}`;
};

// inputState = append | replace | push

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_NEGATIVE:
      return {
        stack: state.stack.map((x, i) => (payload === i ? switchNegative(x) : x)),
        inputState: state.inputState,
      };
    case SWAP:
      return {
        stack: [state.stack[1], state.stack[0], ...state.stack.slice(2)],
        inputState: 'push',
      };
    case CLEAR:
      return initialState;
    case OPERATION:
      return {
        stack: [`${doOperation(state.stack[0], state.stack[1], payload)}`, ...state.stack.slice(2)],
        inputState: 'push',
      };
    case ENTER:
      return {
        stack: [state.stack[0] || '0', ...state.stack],
        inputState: 'replace',
      };
    case PRESS_NUM:
      if (state.inputState === 'append') {
        return {
          stack: [(state.stack[0] || '0') + payload, ...state.stack.slice(1)],
          inputState: 'append',
        };
      } else if (state.inputState === 'replace') {
        return {
          stack: [payload, ...state.stack.slice(1)],
          inputState: 'append',
        };
      } else if (state.inputState === 'push') {
        return {
          stack: [payload, ...state.stack],
          inputState: 'append',
        };
      }
      break;
    default:
      return state;
  }
};
