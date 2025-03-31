https://glowing-nougat-203cea.netlify.app/
```
# Simplified Tremie Thickness Calculator

This repository contains a simplified formula and explanation for estimating the required thickness of a tremie concrete pour in underwater construction. **It is crucial to understand that this is a highly simplified "feel" calculation and should NEVER be used for actual engineering design.**

## Purpose

The purpose of this calculation is to provide a basic understanding of the relationship between water depth and the theoretical concrete thickness needed to balance hydrostatic pressure. It isolates this single factor for educational purposes.

## Formula

The simplified formula used is:

```
t = (γw * h * FS) / γc
```

Where:

* `t` = Tremie thickness (feet)
* `γw` = Unit weight of water (62.4 lb/ft³)
* `h` = Water depth (feet)
* `FS` = Factor of safety (typically 1.5 for this simplified "feel")
* `γc` = Unit weight of concrete (150 lb/ft³)

## Important Considerations

* **This calculation is extremely simplified.** It only accounts for the balance between hydrostatic pressure and the concrete's weight.
* **It ignores critical factors** such as soil conditions, structural loads, reinforcement, cofferdam design, and construction methods.
* **Real-world tremie designs are far more complex.** They require a comprehensive geotechnical and structural engineering analysis.
* **The soil is the most important factor.**
* **Do not use this calculation for actual construction.** Always consult with qualified geotechnical and structural engineers for proper design.
* The output of this calculation, is the bare minimum amount of concrete needed to balance the forces of the water, and does not account for any other real world considerations.

## Example Usage

To calculate the tremie thickness for a 60-foot water depth:

```
t = (62.4 * 60 * 1.5) / 150
t = 37.44 feet
```

## Disclaimer

This calculation is provided for educational purposes only. It is not intended for use in actual construction projects. The author(s) assume no responsibility for any damages or losses resulting from the use of this information. Always consult with qualified professionals.
```
