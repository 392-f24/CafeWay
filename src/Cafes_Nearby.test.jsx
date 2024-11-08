import {describe, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from './App';
import { findCafes } from './utilities/findCafes';

const mockCafes = [
    "Bennison's Bakery",
    "Peet's Coffee",
    "Unicorn Cafe",
    "McDonald's",
    "Sarkis Cafe",
    "Brothers K Coffeehouse",
    "Kush Hookah Lounge",
    "Starbucks",
    "Curt's Café",
    "Alchemy Coffee & Bake House",
    "Coffee Lab Roasters & Asian Bake Shop | Filipino, Japanese, & European Pastries",
    "Evanston Games & Cafe",
    "Kung Fu Tea",
    "Cupitol Coffee & Eatery (Evanston)",
    "Pâtisserie Coralie",
    "Starbucks",
    "FRÍO Gelato - Evanston",
    "Starbucks",
    "Einstein Bros. Bagels",
    "Panera Bread"
]

vi.mock('./utilities/findCafes'); 

beforeEach(() => {
    findCafes.mockReturnValue(mockCafes);
  });
  
  afterEach(() => {
    vi.resetAllMocks();
  });
  
  describe('finding cafes within 2 miles of 60201', () => {
    it('should show all cafes within 2 miles of zip code 60201', () => {
      render(<App />);
      screen.findByText(/Kung Fu Tea/);
      screen.findByText(/Starbucks/);
      screen.findByText(/Panera Bread/);
    });
  });
  