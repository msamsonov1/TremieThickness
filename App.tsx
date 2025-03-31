import React, { useState, useCallback } from 'react';
import { Calculator } from 'lucide-react';

function App() {
  const [depth, setDepth] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [safetyFactor, setSafetyFactor] = useState<string>('1.5');
  const [thickness, setThickness] = useState<number | null>(null);
  const [calculations, setCalculations] = useState<{
    waterPressure: number;
    pressureWithSF: number;
    concreteWeight: number;
    finalThickness: number;
  } | null>(null);

  const calculateTremie = useCallback(() => {
    const d = parseFloat(depth);
    const sf = parseFloat(safetyFactor);

    if (isNaN(d) || isNaN(sf)) {
      return;
    }

    // Constants
    const WATER_DENSITY = 62.4; // pcf
    const CONCRETE_DENSITY = 150; // pcf

    // Calculate water pressure at depth
    const waterPressure = d * WATER_DENSITY;
    
    // Apply safety factor
    const pressureWithSF = waterPressure * sf;
    
    // Calculate required thickness using t = (γw * h * FS) / γc
    const requiredThickness = pressureWithSF / CONCRETE_DENSITY;
    
    // Calculate concrete weight per square foot at calculated thickness
    const concreteWeight = CONCRETE_DENSITY * requiredThickness;
    
    setThickness(Math.ceil(requiredThickness * 10) / 10); // Round up to 1 decimal place
    setCalculations({
      waterPressure: Math.round(waterPressure * 100) / 100,
      pressureWithSF: Math.round(pressureWithSF * 100) / 100,
      concreteWeight: Math.round(concreteWeight * 100) / 100,
      finalThickness: Math.round(requiredThickness * 100) / 100
    });
  }, [depth, safetyFactor]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Tremie Seal Thickness Calculator</h1>
        </div>
        
        <p className="text-gray-600 mb-6">
          Calculate required tremie seal thickness based on balancing water pressure with concrete weight,
          using the simplified "feel" approach with safety factor.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="depth" className="block text-sm font-medium text-gray-700 mb-1">
              Water Depth (ft)
            </label>
            <input
              type="number"
              id="depth"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter water depth"
            />
          </div>

          <div>
            <label htmlFor="safetyFactor" className="block text-sm font-medium text-gray-700 mb-1">
              Factor of Safety
            </label>
            <input
              type="number"
              id="safetyFactor"
              value={safetyFactor}
              onChange={(e) => setSafetyFactor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter safety factor"
              step="0.1"
            />
          </div>

          <button
            onClick={calculateTremie}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Calculate Thickness
          </button>

          {thickness !== null && calculations !== null && (
            <div className="mt-6 space-y-6">
              {/* Formulas Section */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Formula Used:</h2>
                <div className="space-y-2 font-mono text-sm">
                  <p>t = (γw × h × SF) / γc</p>
                  <p className="text-xs text-gray-600 mt-1">Where:</p>
                  <ul className="text-xs text-gray-600 ml-4">
                    <li>t = Tremie thickness</li>
                    <li>γw = Water density (62.4 pcf)</li>
                    <li>h = Water depth ({depth} ft)</li>
                    <li>SF = Safety Factor ({safetyFactor})</li>
                    <li>γc = Concrete density (150 pcf)</li>
                  </ul>
                </div>
              </div>

              {/* Calculations Section */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Step-by-Step Calculations:</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">1. Water Pressure at Depth:</p>
                    <p className="ml-4 font-mono">
                      {depth} × 62.4 = {calculations.waterPressure} psf
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">2. Water Pressure with Safety Factor:</p>
                    <p className="ml-4 font-mono">
                      {calculations.waterPressure} × {safetyFactor} = {calculations.pressureWithSF} psf
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">3. Required Thickness:</p>
                    <p className="ml-4 font-mono">
                      {calculations.pressureWithSF} ÷ 150 = {calculations.finalThickness} ft
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">4. Concrete Weight Verification:</p>
                    <p className="ml-4 font-mono">
                      150 × {calculations.finalThickness} = {calculations.concreteWeight} psf
                    </p>
                  </div>
                </div>
              </div>

              {/* Final Result */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Final Result:</h2>
                <p className="text-gray-700">
                  Required Tremie Seal Thickness: <span className="font-bold">{thickness} ft</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Result rounded up to nearest 0.1 ft for construction purposes
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Notes:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Uses simplified "feel" approach focusing on pressure balance</li>
            <li>Water pressure calculated at tremie level</li>
            <li>Safety factor applied to water pressure</li>
            <li>Results are rounded up to nearest 0.1 ft</li>
            <li>This is a theoretical calculation; actual designs may vary</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;