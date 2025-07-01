// Variables globales
let scores = [0, 0, 0];
let decisions = [];
let currentStepId;

// DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Mostrar secciones
function showSection(id) {
  ['inicio', 'tips', 'minijuegos', 'nosotros', 'encuesta'].forEach(sec => {
    document.getElementById(sec).classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
  if (id === 'minijuegos') startStory();
}

// Tips aleatorios
const tips = [
  'No publiques fotos sin permiso.',
  'Piensa antes de compartir en redes.',
  'Respeta la privacidad de los demás.',
  'Verifica la información antes de difundirla.',
  'No descargues software pirata.',
  'Evita el ciberacoso en cualquier forma.',
  'Protege tus contraseñas y datos personales.',
  'Usa la tecnología para construir, no para destruir.',
  'No uses inteligencia artificial para hacer trampa.',
  'Da crédito a los autores de los contenidos.',
  'Configura bien la privacidad de tus dispositivos.',
  'No uses dispositivos ajenos sin autorización.',
  'Revisa los permisos de las apps.',
  'Piensa en las consecuencias de lo que publicas.',
  'Cambia tus contraseñas regularmente.'
];

function showTip() {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  document.getElementById('tip-content').textContent = tip;
}

// Historia con bifurcaciones
const steps = {
  inicio: {
    text: "Juan es un estudiante que se enfrenta a decisiones éticas en su día a día. Hoy, su amigo Pedro le pide ayuda con una tarea. ¿Qué debería hacer Juan?",
    options: {
      ayudar: "ayudo_pedro",
      no_ayudar: "no_ayudo_pedro"
    }
  },
  ayudo_pedro: {
    text: "Juan decidió ayudar a Pedro. Mientras trabajan juntos, se da cuenta de que Pedro está copiando información sin citar. ¿Qué debería hacer Juan?",
    options: {
      decir: "decir_pedro",
      ignorar: "ignorar_plagio"
    }
  },
  no_ayudo_pedro: {
    text: "Juan decidió no ayudar. Pedro se molesta. ¿Qué debería hacer Juan?",
    options: {
      disculparse: "disculparse_pedro",
      ignorar: "ignorar_pedro"
    }
  },
  decir_pedro: {
    text: "Juan le dice que cite las fuentes. Pedro se enoja. ¿Qué debería hacer Juan?",
    options: {
      insistir: "insistir_citar",
      dejar: "dejarlo_pedro"
    }
  },
  ignorar_plagio: {
    text: "Juan ignoró el plagio. El profesor descubre la copia y sanciona a ambos. ¿Qué debería hacer Juan?",
    options: {
      aceptar_responsabilidad: "fin_malo",
      culpar_pedro: "fin_muy_malo"
    }
  },
  disculparse_pedro: {
    text: "Juan se disculpa. Pedro se calma y deciden trabajar juntos otro día.",
    options: {
      continuar: "ayudo_pedro"
    }
  },
  ignorar_pedro: {
    text: "Juan ignoró a Pedro y su amistad se deteriora.",
    options: {
      reflexionar: "fin_neutro"
    }
  },
  insistir_citar: {
    text: "Juan insistió y Pedro acepta citar las fuentes. Luego, Pedro parece un poco molesto pero reconoce su error.",
    options: {
      celebrar: "celebrar_logro",
      disculparse: "fin_neutro"
    }
  },
  celebrar_logro: {
    text: "Juan celebra que hicieron lo correcto. Pedro agradece su sinceridad y deciden compartir lo aprendido con otros compañeros.",
    options: {
      compartir: "fin_bueno",
      guardar: "fin_neutro"
    }
  },
  dejarlo_pedro: {
    text: "Juan decidió dejar el tema. Pedro entregó el trabajo plagiado y fue sancionado.",
    options: {
      hablar: "fin_neutro",
      ignorar: "fin_malo"
    }
  },
  fin_bueno: {
    text: "🎉 Final Bueno: Juan actuó con integridad y ayudó a su amigo a mejorar. Ahora es visto como un ejemplo en su escuela.",
    options: {}
  },
  fin_neutro: {
    text: "😐 Final Neutral: Juan hizo algunas cosas bien, pero también evitó confrontar problemas importantes.",
    options: {}
  },
  fin_malo: {
    text: "😞 Final Malo: Las decisiones de Juan no ayudaron a mejorar la situación y afectaron su reputación.",
    options: {}
  },
  fin_muy_malo: {
    text: "💀 Final Muy Malo: Juan perdió credibilidad y confianza por culpar a su amigo y no asumir su responsabilidad.",
    options: {}
  }
};

// Iniciar historia
function startStory() {
  currentStepId = 'inicio';
  decisions = [];
  document.getElementById('final-results').classList.add('hidden');
  document.getElementById('restart-button').classList.add('hidden');
  document.getElementById('game-container').classList.remove('hidden');
  showDecision();
}

// Mostrar situación actual
function showDecision() {
  const step = steps[currentStepId];
  const storyElement = document.getElementById('story');
  const container = document.getElementById('game-container');

  storyElement.textContent = step.text;

  if (Object.keys(step.options).length === 0) {
    container.innerHTML = `<button onclick="showFinalResults()">Ver Reflexión Final</button>`;
    return;
  }

  let optionsHTML = '';
  for (const [key, nextId] of Object.entries(step.options)) {
    optionsHTML += `<button onclick="makeDecision('${key}', '${nextId}')">${key.replace(/_/g, ' ')}</button>`;
  }
  container.innerHTML = optionsHTML;
}

// Registrar decisión y avanzar
function makeDecision(decisionKey, nextStepId) {
  decisions.push(decisionKey);
  currentStepId = nextStepId;
  showDecision();
}

// Mostrar resultado final
function showFinalResults() {
  document.getElementById('game-container').classList.add('hidden');
  document.getElementById('final-results').classList.remove('hidden');
  document.getElementById('restart-button').classList.remove('hidden');

  const correct = [
    'ayudar', 'decir', 'insistir', 'celebrar', 'compartir', 'aceptar_responsabilidad'
  ];

  let html = "<h3>Decisiones de Juan:</h3><ul class='decision-list'>";
  let correctCount = 0;

  decisions.forEach((d, i) => {
    const isCorrect = correct.includes(d);
    if (isCorrect) correctCount++;
    html += `<li>Decisión ${i + 1}: ${d} - <span class='${isCorrect ? 'correct' : 'incorrect'}'>${isCorrect ? 'Correcta' : 'Incorrecta'}</span></li>`;
  });

  html += "</ul><h3>Reflexión Final:</h3>";

  if (correctCount >= decisions.length * 0.75) {
    html += "<p class='reflection'>🎉 <strong>Final Bueno:</strong> Juan se convirtió en un ejemplo positivo. Su capacidad de actuar con integridad, de mantener la honestidad y de compartir sus valores impactó de forma muy positiva a su entorno. Este final muestra que tener principios sólidos puede transformar no solo nuestra vida, sino también la de quienes nos rodean. ¡Felicitaciones por tus elecciones!</p>";
  } else if (correctCount >= decisions.length * 0.4) {
    html += "<p class='reflection'>😐 <strong>Final Neutral:</strong> Aunque Juan tomó decisiones que demostraron integridad en algunos momentos, en otras situaciones prefirió evitar el conflicto o no actuar. Esto refleja que todavía hay un camino por recorrer para consolidar valores sólidos y la valentía de aplicarlos siempre. Reflexiona sobre cómo puedes actuar con más constancia.</p>";
  } else {
    html += "<p class='reflection'>😞 <strong>Final Malo:</strong> Las decisiones de Juan no promovieron cambios positivos. La falta de compromiso y responsabilidad llevaron a consecuencias negativas. Este final es una oportunidad para reflexionar sobre cómo nuestras acciones repercuten en quienes nos rodean y cómo podemos empezar a construir un comportamiento más ético y empático.</p>";
  }

  document.getElementById('final-results').innerHTML = html;
}

// Reiniciar
function restartStory() {
  startStory();
}

// Encuesta
function submitSurvey() {
  const val = document.getElementById('satisfaction').value;
  const com = document.getElementById('comments').value;
  const fb = document.getElementById('survey-feedback');
  fb.textContent = `Gracias por tu calificación de ${val} estrellas. Tus comentarios: ${com}`;
  fb.classList.remove('hidden');
  document.getElementById('survey-form').reset();
}
