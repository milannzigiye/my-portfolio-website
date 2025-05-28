// Robotics and Automation Animations
document.addEventListener('DOMContentLoaded', function() {
    // Create robotics animation container
    const heroSection = document.querySelector('.hero');
    const animationContainer = document.createElement('div');
    animationContainer.className = 'robotics-animation-container';
    heroSection.appendChild(animationContainer);
    
    // Create animation elements
    createRoboticElements(animationContainer);
    
    // Create floating gears
    createFloatingGears();
    
    // Create circuit lines
    createCircuitLines();
});

// Create robotic elements that move around
function createRoboticElements(container) {
    // Robot arm
    const robotArm = document.createElement('div');
    robotArm.className = 'robot-arm';
    container.appendChild(robotArm);
    
    // Robot joints
    for (let i = 0; i < 3; i++) {
        const joint = document.createElement('div');
        joint.className = 'robot-joint';
        joint.style.animationDelay = `${i * 0.5}s`;
        robotArm.appendChild(joint);
    }
    
    // Robot claw
    const robotClaw = document.createElement('div');
    robotClaw.className = 'robot-claw';
    robotArm.appendChild(robotClaw);
    
    // Left and right claw parts
    const leftClaw = document.createElement('div');
    leftClaw.className = 'claw-part left-claw';
    robotClaw.appendChild(leftClaw);
    
    const rightClaw = document.createElement('div');
    rightClaw.className = 'claw-part right-claw';
    robotClaw.appendChild(rightClaw);
    
    // Drone elements
    for (let i = 0; i < 3; i++) {
        const drone = document.createElement('div');
        drone.className = 'drone';
        drone.style.animationDelay = `${i * 2}s`;
        
        // Drone body
        const droneBody = document.createElement('div');
        droneBody.className = 'drone-body';
        drone.appendChild(droneBody);
        
        // Drone propellers
        for (let j = 0; j < 4; j++) {
            const propeller = document.createElement('div');
            propeller.className = 'drone-propeller';
            propeller.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
            drone.appendChild(propeller);
        }
        
        container.appendChild(drone);
    }
    
    // Data particles
    for (let i = 0; i < 20; i++) {
        createDataParticle(container);
    }
}

// Create floating gears
function createFloatingGears() {
    const heroSection = document.querySelector('.hero');
    
    for (let i = 0; i < 8; i++) {
        const gear = document.createElement('div');
        gear.className = 'floating-gear';
        
        // Randomize gear properties
        const size = 20 + Math.random() * 40;
        gear.style.width = `${size}px`;
        gear.style.height = `${size}px`;
        
        gear.style.left = `${Math.random() * 100}%`;
        gear.style.top = `${Math.random() * 100}%`;
        
        gear.style.animationDuration = `${10 + Math.random() * 20}s`;
        gear.style.animationDelay = `${Math.random() * 5}s`;
        
        // Create gear teeth
        const teethCount = 8 + Math.floor(size / 5);
        for (let j = 0; j < teethCount; j++) {
            const tooth = document.createElement('div');
            tooth.className = 'gear-tooth';
            tooth.style.transform = `rotate(${j * (360 / teethCount)}deg)`;
            gear.appendChild(tooth);
        }
        
        // Create gear center
        const gearCenter = document.createElement('div');
        gearCenter.className = 'gear-center';
        gear.appendChild(gearCenter);
        
        heroSection.appendChild(gear);
    }
}

// Create circuit lines
function createCircuitLines() {
    const heroSection = document.querySelector('.hero');
    const circuitContainer = document.createElement('div');
    circuitContainer.className = 'circuit-container';
    heroSection.appendChild(circuitContainer);
    
    // Create horizontal and vertical lines
    for (let i = 0; i < 5; i++) {
        // Horizontal lines
        const hLine = document.createElement('div');
        hLine.className = 'circuit-line horizontal';
        hLine.style.top = `${20 + i * 15}%`;
        hLine.style.width = `${30 + Math.random() * 40}%`;
        hLine.style.left = `${Math.random() * 30}%`;
        hLine.style.animationDelay = `${i * 0.5}s`;
        circuitContainer.appendChild(hLine);
        
        // Vertical lines
        const vLine = document.createElement('div');
        vLine.className = 'circuit-line vertical';
        vLine.style.left = `${20 + i * 15}%`;
        vLine.style.height = `${30 + Math.random() * 40}%`;
        vLine.style.top = `${Math.random() * 30}%`;
        vLine.style.animationDelay = `${i * 0.5 + 0.25}s`;
        circuitContainer.appendChild(vLine);
        
        // Create nodes at intersections
        createCircuitNode(circuitContainer, 
            parseInt(hLine.style.left) + Math.random() * parseInt(hLine.style.width), 
            parseInt(hLine.style.top));
    }
    
    // Create additional nodes
    for (let i = 0; i < 10; i++) {
        createCircuitNode(circuitContainer, 
            Math.random() * 100, 
            Math.random() * 100);
    }
}

// Create circuit node
function createCircuitNode(container, x, y) {
    const node = document.createElement('div');
    node.className = 'circuit-node';
    node.style.left = `${x}%`;
    node.style.top = `${y}%`;
    
    // Pulse animation with random delay
    node.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(node);
}

// Create data particle
function createDataParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'data-particle';
    
    // Randomize particle properties
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${3 + Math.random() * 7}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(particle);
    
    // Remove and recreate particles to maintain performance
    setTimeout(() => {
        particle.remove();
        createDataParticle(container);
    }, parseInt(particle.style.animationDuration) * 1000);
}
