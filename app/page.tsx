"use client";
import { useEffect, useState } from 'react';

export default function TreinoApp() {
  const treinos = {
    Segunda: {
      foco: 'Glúteo + Posterior',
      blocos: [
        {
          titulo: 'Bloco 1 — Força',
          voltas: '3 voltas',
          descanso: '90s',
          exercicios: [
            ['Agachamento sumô', '12'],
            ['Stiff', '12'],
            ['Afundo reverso', '10 cada perna'],
            ['Agachamento pulsando', '20s'],
          ],
        },
        {
          titulo: 'Bloco 2 — Glúteo',
          voltas: '3 voltas',
          descanso: '60s',
          exercicios: [
            ['Elevação pélvica', '12'],
            ['Abdução com mini band', '20'],
            ['Coice no cabo ou banco', '15 cada'],
          ],
        },
      ],
      finalizador: [
        'Subida no banco',
        'Agachamento rápido',
        'Corrida leve',
        'Corda imaginária',
      ],
    },

    Terça: {
      foco: 'Ombro + Braço + Costas',
      blocos: [
        {
          titulo: 'Bloco 1 — Ombros',
          voltas: '4 voltas',
          descanso: '60s',
          exercicios: [
            ['Desenvolvimento', '12'],
            ['Elevação lateral', '15'],
            ['Crucifixo inverso', '15'],
            ['Elevação lateral parcial', '15 curtas'],
          ],
        },
        {
          titulo: 'Bloco 2 — Braços',
          voltas: '3 voltas',
          descanso: '60s',
          exercicios: [
            ['Tríceps corda', '15'],
            ['Tríceps testa', '12'],
            ['Rosca martelo', '12'],
            ['Rosca alternada', '12'],
          ],
        },
        {
          titulo: 'Bloco 3 — Costas + Core',
          voltas: '3 voltas',
          descanso: '60s',
          exercicios: [
            ['Remada baixa', '15'],
            ['Pulldown', '15'],
            ['Prancha', '40s'],
            ['Vacuum abdominal', '20s'],
          ],
        },
      ],
      finalizador: ['15 min caminhada inclinada (inclinação 8–12)'],
    },

    Quarta: {
      foco: 'Perna Completa + Glúteo',
      blocos: [
        {
          titulo: 'Bloco 1 — Quadríceps',
          voltas: '3 voltas',
          descanso: '90s',
          exercicios: [
            ['Agachamento livre', '12'],
            ['Leg press', '15'],
            ['Passada andando', '12 cada'],
            ['Agachamento isométrico', '30s'],
          ],
        },
        {
          titulo: 'Bloco 2 — Glúteo',
          voltas: '3 voltas',
          descanso: '60s',
          exercicios: [
            ['Elevação pélvica', '15'],
            ['Abdução máquina', '20'],
            ['Stiff unilateral', '12 cada'],
          ],
        },
      ],
      finalizador: ['Bike: 30s forte / 30s leve ×10'],
    },

    Quinta: {
      foco: 'Metabólico Feminino',
      blocos: [
        {
          titulo: 'Circuito',
          voltas: '5 voltas',
          descanso: '1 min',
          exercicios: [
            ['Kettlebell swing', '15'],
            ['Step-up no banco', '12 cada'],
            ['Remada', '12'],
            ['Agachamento com halter', '15'],
            ['Mountain climber lento', '30s'],
            ['Bike', '1 min'],
          ],
        },
        {
          titulo: 'Core',
          voltas: '3 voltas',
          descanso: 'Sem descanso definido',
          exercicios: [
            ['Prancha lateral', '30s'],
            ['Bird dog', '12'],
            ['Vacuum abdominal', '20s'],
          ],
        },
      ],
      finalizador: ['Treino metabólico concluído'],
    },

    Sexta: {
      foco: 'Glúteo + Full Body',
      blocos: [
        {
          titulo: 'Bloco 1',
          voltas: '4 voltas',
          descanso: '90s',
          exercicios: [
            ['Terra romeno', '12'],
            ['Agachamento goblet', '15'],
            ['Desenvolvimento', '12'],
            ['Remada baixa', '12'],
          ],
        },
        {
          titulo: 'Bloco 2 — Glúteo Intenso',
          voltas: '3 voltas',
          descanso: '60s',
          exercicios: [
            ['Elevação pélvica', '15'],
            ['Abdução', '25'],
            ['Frog pump', '25'],
          ],
        },
      ],
      finalizador: ['Escada: 8 min contínuos'],
    },
  };

  const [concluidos, setConcluidos] = useState({});
  const [tempo, setTempo] = useState(60);
  const [rodando, setRodando] = useState(false);

  useEffect(() => {
    const salvo = localStorage.getItem('treino-checklist');
    if (salvo) {
      setConcluidos(JSON.parse(salvo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('treino-checklist', JSON.stringify(concluidos));
  }, [concluidos]);

  useEffect(() => {
    let timer;

    if (rodando && tempo > 0) {
      timer = setInterval(() => {
        setTempo((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [rodando, tempo]);

  const toggleExercicio = (key) => {
    setConcluidos((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;

    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="bg-black text-white rounded-3xl px-6 py-4 shadow-xl">
              <p className="text-sm uppercase tracking-wide opacity-70">
                Cronômetro de descanso
              </p>

              <h2 className="text-4xl font-bold mt-1 mb-3">
                {formatarTempo(tempo)}
              </h2>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setRodando(true)}
                  className="bg-white text-black px-4 py-2 rounded-2xl font-semibold"
                >
                  Iniciar
                </button>

                <button
                  onClick={() => setRodando(false)}
                  className="bg-white/20 px-4 py-2 rounded-2xl"
                >
                  Pausar
                </button>

                <button
                  onClick={() => {
                    setTempo(60);
                    setRodando(false);
                  }}
                  className="bg-white/20 px-4 py-2 rounded-2xl"
                >
                  Resetar
                </button>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Meu Treino</h1>
          <p className="text-gray-600 text-lg">
            Organização semanal dos seus treinos
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(treinos).map(([dia, dados]) => (
            <div
              key={dia}
              className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{dia}</h2>
                <span className="text-sm bg-black text-white px-3 py-1 rounded-full">
                  {dados.foco}
                </span>
              </div>

              <div className="space-y-5">
                {dados.blocos.map((bloco, blocoIndex) => (
                  <div
                    key={blocoIndex}
                    className="bg-gray-50 rounded-3xl p-4"
                  >
                    <div className="mb-3">
                      <h3 className="font-bold text-lg">{bloco.titulo}</h3>
                      <p className="text-sm text-gray-500">
                        {bloco.voltas} • Descanso: {bloco.descanso}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {bloco.exercicios.map(([nome, serie], index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white rounded-2xl p-3"
                        >
                          <div>
                            <p className="font-semibold">{nome}</p>
                            <p className="text-sm text-gray-500">{serie}</p>
                          </div>

                          <input
                            type="checkbox"
                            checked={concluidos[`${dia}-${blocoIndex}-${index}`] || false}
                            onChange={() =>
                              toggleExercicio(`${dia}-${blocoIndex}-${index}`)
                            }
                            className="w-6 h-6 rounded-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-black text-white rounded-3xl p-4">
                  <h3 className="font-bold text-lg mb-2">Finalizador</h3>

                  <div className="space-y-2">
                    {dados.finalizador.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white/10 rounded-2xl p-3 text-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <textarea
                  placeholder="Observações do treino..."
                  className="w-full border rounded-2xl p-3 text-sm resize-none h-24"
                />
              </div>

              <button className="w-full mt-4 bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition">
                Finalizar treino
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Progressão de Carga</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              placeholder="Exercício"
              className="border rounded-2xl p-3"
            />
            <input
              placeholder="Carga Atual"
              className="border rounded-2xl p-3"
            />
            <input
              placeholder="Meta"
              className="border rounded-2xl p-3"
            />
          </div>

          <button className="mt-4 bg-black text-white px-6 py-3 rounded-2xl font-semibold">
            Salvar progresso
          </button>
        </div>
      </div>
    </div>
  );
}
