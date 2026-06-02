"use client";

import { useEffect, useState } from "react";

import { auth, db } from "@/lib/firebase";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

export default function TreinoApp() {
  const treinos: Record<string, any> = {
    Segunda: {
      foco: "Glúteo + Posterior",
      blocos: [
        {
          titulo: "Bloco 1 — Força",
          voltas: "3 voltas",
          descanso: "90s",
          exercicios: [
            ["Agachamento sumô", "12"],
            ["Stiff", "12"],
            ["Afundo reverso", "10 cada perna"],
            ["Agachamento pulsando", "20s"],
          ],
        },
        {
          titulo: "Bloco 2 — Glúteo",
          voltas: "3 voltas",
          descanso: "60s",
          exercicios: [
            ["Elevação pélvica", "12"],
            ["Abdução com mini band", "20"],
            ["Coice no cabo ou banco", "15 cada"],
          ],
        },
      ],
      finalizador: [
        "Subida no banco",
        "Agachamento rápido",
        "Corrida leve",
        "Corda imaginária",
      ],
    },

    Terça: {
      foco: "Ombro + Braço + Costas",
      blocos: [
        {
          titulo: "Bloco 1 — Ombros",
          voltas: "4 voltas",
          descanso: "60s",
          exercicios: [
            ["Desenvolvimento", "12"],
            ["Elevação lateral", "15"],
            ["Crucifixo inverso", "15"],
            ["Elevação lateral parcial", "15 curtas"],
          ],
        },
        {
          titulo: "Bloco 2 — Braços",
          voltas: "3 voltas",
          descanso: "60s",
          exercicios: [
            ["Tríceps corda", "15"],
            ["Tríceps testa", "12"],
            ["Rosca martelo", "12"],
            ["Rosca alternada", "12"],
          ],
        },
        {
          titulo: "Bloco 3 — Costas + Core",
          voltas: "3 voltas",
          descanso: "60s",
          exercicios: [
            ["Remada baixa", "15"],
            ["Pulldown", "15"],
            ["Prancha", "40s"],
            ["Vacuum abdominal", "20s"],
          ],
        },
      ],
      finalizador: ["15 min caminhada inclinada (inclinação 8–12)"],
    },

    Quarta: {
      foco: "Perna Completa + Glúteo",
      blocos: [
        {
          titulo: "Bloco 1 — Quadríceps",
          voltas: "3 voltas",
          descanso: "90s",
          exercicios: [
            ["Agachamento livre", "12"],
            ["Leg press", "15"],
            ["Passada andando", "12 cada"],
            ["Agachamento isométrico", "30s"],
          ],
        },
        {
          titulo: "Bloco 2 — Glúteo",
          voltas: "3 voltas",
          descanso: "60s",
          exercicios: [
            ["Elevação pélvica", "15"],
            ["Abdução máquina", "20"],
            ["Stiff unilateral", "12 cada"],
          ],
        },
      ],
      finalizador: ["Bike: 30s forte / 30s leve ×10"],
    },

    Quinta: {
      foco: "Metabólico Feminino",
      blocos: [
        {
          titulo: "Circuito",
          voltas: "5 voltas",
          descanso: "1 min",
          exercicios: [
            ["Kettlebell swing", "15"],
            ["Step-up no banco", "12 cada"],
            ["Remada", "12"],
            ["Agachamento com halter", "15"],
            ["Mountain climber lento", "30s"],
            ["Bike", "1 min"],
          ],
        },
        {
          titulo: "Core",
          voltas: "3 voltas",
          descanso: "Sem descanso definido",
          exercicios: [
            ["Prancha lateral", "30s"],
            ["Bird dog", "12"],
            ["Vacuum abdominal", "20s"],
          ],
        },
      ],
      finalizador: ["Treino metabólico concluído"],
    },

       Sexta: {
      foco: "Glúteo + Full Body",
      blocos: [
        {
          titulo: "Bloco 1",
          voltas: "4 voltas",
          descanso: "90s",
          exercicios: [
            ["Terra romeno", "12"],
            ["Agachamento goblet", "15"],
            ["Desenvolvimento", "12"],
            ["Remada baixa", "12"],
          ],
        },
        {
          titulo: "Bloco 2 — Glúteo Intenso",
          voltas: "3 voltas",
          descanso: "60s",
          exercicios: [
            ["Elevação pélvica", "15"],
            ["Abdução", "25"],
            ["Frog pump", "25"],
          ],
        },
      ],
      finalizador: ["Escada: 8 min contínuos"],
    },

    Sabado: {
      foco: "Descanso Ativo",
      blocos: [],
      finalizador: [
        "🚶 Caminhada 30 min",
        "🧘 Alongamento",
        "🤸 Mobilidade",
      ],
    },

    Domingo: {
      foco: "Recuperação",
      blocos: [],
      finalizador: [
        "😴 Descanso",
        "💧 Hidratação",
        "🛌 Recuperação muscular",
      ],
    },
  };
  const [concluidos, setConcluidos] = useState<Record<string, boolean>>({});
const [treinosConcluidos, setTreinosConcluidos] = useState<Record<string, boolean>>({});
const [diaSelecionado, setDiaSelecionado] = useState("Segunda");
const [tempo, setTempo] = useState(60);
const [rodando, setRodando] = useState(false);

useEffect(() => {
  console.log("Treinos concluídos:", treinosConcluidos);
}, [treinosConcluidos]);

const [usuario, setUsuario] = useState<any>(null);

useEffect(() => {
  const salvo = localStorage.getItem("treino-checklist");

  if (salvo) {
    setConcluidos(JSON.parse(salvo));
  }

  const treinosSalvos = localStorage.getItem("treinos-concluidos");

  if (treinosSalvos) {
    setTreinosConcluidos(JSON.parse(treinosSalvos));
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "treino-checklist",
    JSON.stringify(concluidos)
  );
}, [concluidos]);

useEffect(() => {
  localStorage.setItem(
    "treinos-concluidos",
    JSON.stringify(treinosConcluidos)
  );
}, [treinosConcluidos]);

useEffect(() => {
  let timer: ReturnType<typeof setInterval> | null = null;

  if (rodando && tempo > 0) {
    timer = setInterval(() => {
      setTempo((prev) => prev - 1);
    }, 1000);
  }

  return () => {
    if (timer) {
      clearInterval(timer);
    }
  };
}, [rodando, tempo]);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUsuario(user);

      const docRef = doc(db, "treinos", user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setConcluidos(docSnap.data().concluidos || {});
      }
    }
  });

  return () => unsubscribe();
}, []);  

const toggleExercicio = (key: string) => {
    setConcluidos((prev: Record<string, boolean>) => {
      const atual = prev?.[key] ?? false;

      return {
        ...prev,
        [key]: !atual,
      };
    });
  };
const loginGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);

    alert("Login realizado com sucesso!");
  } catch (error) {
    console.error(error);
    alert("Erro ao fazer login");
  }
};
  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;

    return `${min}:${sec.toString().padStart(2, "0")}`;
  };
const calcularProgresso = (dia: string, dados: any) => {
  const total = dados.blocos.reduce(
    (soma: number, bloco: any) => soma + bloco.exercicios.length,
    0
  );

  const feitos = dados.blocos.reduce((soma: number, bloco: any, blocoIndex: number) => {
    const concluidosBloco = bloco.exercicios.filter(
      (_: any, index: number) => concluidos[`${dia}-${blocoIndex}-${index}`]
    ).length;

    return soma + concluidosBloco;
  }, 0);

  const porcentagem = total === 0 ? 0 : Math.round((feitos / total) * 100);

  return { total, feitos, porcentagem };
};
const totalTreinos = Object.keys(treinos).length;

const treinosFeitos = Object.values(treinosConcluidos).filter(Boolean).length;

const aproveitamento =
  totalTreinos === 0 ? 0 : Math.round((treinosFeitos / totalTreinos) * 100);
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

<button
  onClick={loginGoogle}
  className="bg-black text-white px-6 py-3 rounded-2xl font-semibold mb-6"
>
  Entrar com Google
</button>
          <h1 className="text-4xl font-bold mb-2">Meu Treino</h1>
          <p className="text-gray-600 text-lg">
            Organização semanal dos seus treinos
          </p>
        </div>
<div className="mt-6 bg-white rounded-3xl shadow-lg p-4">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
  <div className="bg-white rounded-3xl shadow-lg p-5 text-center">
    <p className="text-gray-500 text-sm">
      Treinos Feitos
    </p>

    <h3 className="text-3xl font-bold mt-2">
      {treinosFeitos}
    </h3>
  </div>

  <div className="bg-white rounded-3xl shadow-lg p-5 text-center">
    <p className="text-gray-500 text-sm">
      Semana Atual
    </p>

    <h3 className="text-3xl font-bold mt-2">
      {treinosFeitos}/{totalTreinos}
    </h3>
  </div>

  <div className="bg-white rounded-3xl shadow-lg p-5 text-center">
    <p className="text-gray-500 text-sm">
      Aproveitamento
    </p>

    <h3 className="text-3xl font-bold mt-2 text-green-600">
      {aproveitamento}%
    </h3>
  </div>
</div>
  <h2 className="text-lg font-bold mb-3">Resumo da Semana</h2>
<div className="flex gap-3 overflow-x-auto pb-3 mb-6">
  {Object.keys(treinos).map((dia) => {
    const selecionado = diaSelecionado === dia;
    const concluido = treinosConcluidos[dia];

    return (
      <button
        key={dia}
        onClick={() => setDiaSelecionado(dia)}
        className={`min-w-[72px] rounded-3xl px-4 py-3 text-center transition-all duration-300 ${
          selecionado
            ? "bg-green-600 text-white shadow-lg scale-105"
            : concluido
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-white text-gray-600 border border-gray-200"
        }`}
      >
        <div className="text-lg font-bold">
          {concluido ? "✓" : dia.slice(0, 3).toUpperCase()}
        </div>

        <div className="text-xs font-semibold mt-1">
          {dia.slice(0, 3)}
        </div>
      </button>
    );
  })}
</div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
  {Object.entries(treinos)
    .filter(([dia]) => dia === diaSelecionado)
    .map(([dia, dados]) => {
  const progresso = calcularProgresso(dia, dados);
const totalTreinos = Object.keys(treinos).length;

const treinosFeitos = Object.values(treinosConcluidos).filter(
  Boolean
).length;

const aproveitamento = Math.round(
  (treinosFeitos / totalTreinos) * 100
);
  return (
            <div
              key={dia}
              className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
  <div>
    <div className="mb-3">
  <div className="flex justify-between text-sm mb-1">
   <span className="text-gray-700 font-semibold">Progresso</span>
    <span className="text-gray-700 font-semibold">
  {progresso.feitos}/{progresso.total}
</span>
  </div>

  <div className="w-full bg-gray-200 rounded-full h-3">
    <div
      className="bg-green-500 h-3 rounded-full transition-all duration-500"
      style={{ width: `${progresso.porcentagem}%` }}
    />
  </div>

  <p className="text-xs text-gray-600 font-medium mt-1">
  {progresso.porcentagem}% concluído
</p>
</div>
    <h2 className="text-2xl font-bold text-gray-700">{dia}</h2>

    {treinosConcluidos[dia] && (
      <p className="text-green-600 font-bold text-sm mt-1">
        ✅ Concluído
      </p>
    )}
  </div>

  <span className="text-sm bg-black text-white px-3 py-1 rounded-full">
    {dados.foco}
  </span>
</div>
{treinosConcluidos[dia] ? (
  <div className="bg-green-50 border border-green-300 rounded-3xl p-5 text-center">
    <p className="text-3xl mb-2">✅</p>
    <h3 className="text-xl font-bold text-green-700">
      Treino concluído
    </h3>
    <p className="text-green-600 mt-1">
      Bom trabalho! Esse treino já foi finalizado.
    </p>

    <button
      type="button"
      onClick={() =>
        setTreinosConcluidos((prev) => ({
          ...prev,
          [dia]: false,
        }))
      }
      className="mt-4 bg-green-600 text-white px-5 py-3 rounded-2xl font-semibold"
    >
      Reabrir treino
    </button>
  </div>
) : (
  <>
              <div className="space-y-5">
                {dados.blocos.length === 0 && (
  <div className="bg-green-50 border border-green-200 rounded-3xl p-5 text-center">
    <p className="text-3xl mb-2">
      {dia === "Sabado" ? "🧘" : "😴"}
    </p>

    <h3 className="text-xl font-bold text-green-700">
      {dia === "Sabado" ? "Descanso Ativo" : "Recuperação"}
    </h3>

    <p className="text-green-600 mt-2">
      {dia === "Sabado"
        ? "Dia leve para movimentar o corpo sem sobrecarregar."
        : "Descanse e prepare-se para a próxima semana."}
    </p>
  </div>
)}
                {dados.blocos.map((bloco: any, blocoIndex: number) => (
                  <div key={blocoIndex} className="bg-gray-50 rounded-3xl p-4">
                    <div className="mb-3">
                      <h3 className="font-bold text-lg text-gray-700">{bloco.titulo}</h3>
                      <p className="text-sm text-gray-600 font-medium">
  {bloco.voltas} • Descanso: {bloco.descanso}
</p>
                    </div>

                    <div className="space-y-3">
                      {bloco.exercicios.map(
                        ([nome, serie]: [string, string], index: number) => (
                          <div
                            key={index}
                            className={`
flex items-center justify-between
rounded-2xl p-4 border transition-all duration-300
${
  concluidos[`${dia}-${blocoIndex}-${index}`]
    ? "bg-green-50 border-green-300 shadow-sm"
    : "bg-white border-gray-200"
}
`}
                          >
                            <div>
                              <p className="font-bold text-black text-base">
  {nome}
</p>
                              <p className="text-sm text-gray-600 mt-1">
  {serie}
</p>
                            </div>

                            <input
                              type="checkbox"
                              checked={
                                concluidos[`${dia}-${blocoIndex}-${index}`] ||
                                false
                              }
                              onChange={() =>
                                toggleExercicio(
                                  `${dia}-${blocoIndex}-${index}`
                                )
                              }
                              className="
w-7 h-7
accent-green-600
cursor-pointer
"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}

                <div className="bg-black text-white rounded-3xl p-4">
                  <h3 className="font-bold text-lg mb-2">Finalizador</h3>

                  <div className="space-y-2">
                    {dados.finalizador.map(
                      (item: string, index: number) => (
                        <div
                          key={index}
                          className="bg-white/10 rounded-2xl p-3 text-sm"
                        >
                          {item}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <textarea
                  placeholder="Observações do treino..."
                  className="w-full border rounded-2xl p-3 text-sm resize-none h-24"
                />
              </div>

              <button
  onClick={() => {
       setTreinosConcluidos((prev) => ({
      ...prev,
      [dia]: true,
    }));
  }}
  className="w-full mt-4 bg-green-600 text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
>
  ✅ Finalizar treino
</button>
</>
)}
            </div>

          );
        })}
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
            <input placeholder="Meta" className="border rounded-2xl p-3" />
          </div>

          <button className="mt-4 bg-black text-white px-6 py-3 rounded-2xl font-semibold">
            Salvar progresso
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}