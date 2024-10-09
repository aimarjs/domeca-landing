# Cost Estimation Calculation Outline

The cost estimation in this bus trip booking application involves calculating the total trip cost based on multiple factors, including distance, travel time, waiting time, pricing structure, and taxes. Below is a breakdown of the calculation process:

## 1. Inputs Required for Calculation
- **Real Distance (Km)**: The actual distance traveled, including the return trip to and from the headquarters (HQ).
- **Travel Time (Minutes)**: The total travel time calculated based on the planned trip route.
- **Waiting Time (Minutes)**: The difference between the customer-defined end time and the actual calculated travel time.
- **Passengers**: The number of passengers for the trip.
- **Pricing Data**:
  - **Base Fare per Kilometer**: The base cost for each kilometer traveled.
  - **One-Time Starting Fee**: A fixed fee applied to each trip.
  - **Hourly Price**: The cost per hour of travel.
  - **Waiting Hour Price**: The cost per hour of waiting time.
  - **Discount**: A discount percentage that is applied if the distance exceeds a certain threshold.
  - **Discount Start Km**: The distance (in kilometers) after which the discount starts applying.
- **Tax Rate**: A tax rate that is applied to the total calculated cost.

## 2. Step-by-Step Calculation Process

### Step 1: Calculate Distance Cost
- **Base Fare**: 
  - The **base fare per kilometer** is multiplied by the total distance traveled (including the return trip).
  - Formula: `distanceCost = realDistance * baseFarePerKm`
- **Apply Discount**: 
  - If the total distance exceeds the **discount start kilometers**, the discount is applied to the distance cost.
  - Formula: `discountedDistanceCost = distanceCost * (1 - discount / 100)` (if applicable).

### Step 2: Calculate Time-Based Costs
- **Hourly Travel Cost**: 
  - The **hourly price** is applied based on the total travel time, which is converted from minutes to hours.
  - Formula: `timeCost = (travelTime / 60) * hourPrice`
  
- **Waiting Time Cost**:
  - The **waiting hour price** is applied based on the waiting time, which is also converted from minutes to hours.
  - Formula: `waitingCost = (waitingTime / 60) * waitingHourPrice`
  
### Step 3: Add Fixed Costs
- **One-Time Starting Fee**: 
  - A fixed fee is added to each trip.
  - Formula: `totalBeforeTax = discountedDistanceCost + timeCost + waitingCost + oneTimeStartingFee`

### Step 4: Apply Tax
- **Total Cost with Tax**:
  - The total cost is calculated by applying the **tax rate** to the subtotal (distance, time, waiting, and fixed costs).
  - Formula: `totalCostWithTax = totalBeforeTax * (1 + TAX_RATE)`

## 3. Final Cost Formula
The final cost formula can be represented as:


## 4. Example Calculation 
Suppose the following inputs:
- **Real Distance**: 150 km
- **Travel Time**: 180 minutes (3 hours)
- **Waiting Time**: 60 minutes (1 hour)
- **Passengers**: 3
- **Base Fare per Km**: €0.5
- **One-Time Starting Fee**: €10
- **Hourly Price**: €20
- **Waiting Hour Price**: €15
- **Discount**: 10% (if distance > 100 km)
- **Tax Rate**: 22%

1. **Base Distance Cost**: `150 km * €0.5 = €75`
2. **Apply 10% Discount**: `€75 * 0.9 = €67.5`
3. **Time Cost**: `(180 minutes / 60) * €20 = €60`
4. **Waiting Cost**: `(60 minutes / 60) * €15 = €15`
5. **One-Time Starting Fee**: €10
6. **Subtotal Before Tax**: `€67.5 + €60 + €15 + €10 = €152.5`
7. **Total Cost with Tax**: `€152.5 * 1.22 = €186.05`

## 5. Conclusion
The final estimated cost for the trip is **€186.05**, which includes all relevant distance, time, and waiting time calculations, along with a one-time starting fee and applicable taxes.
