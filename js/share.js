// Shared plan / report page: eatnibble.app/p/<id> (eating plan) and /r/<id> (meal report).
// Reads the public share from the backend and draws it. Everything the sharer typed is
// inserted as text (textContent), never as HTML.
(function () {
  "use strict";

  var API = "https://eatnibble-backend.vercel.app/public/shares/";
  var STORE = "https://apps.apple.com/us/app/eatnibble-ai-calorie-tracker/id6797879350";
  var COLORS = { protein: "var(--protein)", carbs: "var(--brand)", fat: "var(--fat)" };

  var STRINGS = {
    en: {
      eyebrow: "Shared from eatnibble",
      plan_title: "Eating plan",
      report_title: "Meal report",
      shared_by: "Shared by {name}",
      shared_on: "Shared {date}",
      expires_on: "Link expires {date}",
      macros_title: "Macro split",
      macros_note: "Shares of daily calories. Your own goal decides the grams.",
      protein: "Protein", carbs: "Carbs", fat: "Fat",
      short: { protein: "P", carbs: "C", fat: "F" },
      preset: { balanced: "Balanced", highProtein: "High protein", lowCarb: "Low carb", keto: "Keto", custom: "Custom" },
      cycle_title: "Calorie cycling",
      cycle_note: "High days get {n}% more, low days less. The week evens out.",
      level: { low: "Low", normal: "Normal", high: "High" },
      fasting_title: "Intermittent fasting",
      fasting_note: "{f} hours fasting, {e}-hour eating window",
      recipes_title: "Recipes",
      servings: "Makes {n} servings",
      servings_one: "Makes 1 serving",
      per_serving: "per serving",
      ingredients: "Ingredients ({n})",
      meals_title: "Go-to meals",
      import_title: "Use this plan in eatnibble",
      import_steps: ["Get eatnibble from the App Store.", "Open this link again on your iPhone.", "Pick what to add: macros, cycling, fasting, recipes, meals."],
      import_note: "Your calorie goal, weight and health data stay yours. None of it is in this plan.",
      open_app: "Open in eatnibble",
      report_days: "{n} days logged",
      report_days_one: "1 day logged",
      avg_title: "Daily average",
      avg_note: "Over logged days only.",
      daily_title: "Calories by day",
      days_title: "Meals",
      report_note: "Only logged meals were shared: no goals, weight or health data.",
      print: "Print",
      notfound_title: "This link is no longer available",
      notfound_body: "It may have expired, or the person who shared it removed it.",
      error_title: "Couldn't load this page",
      error_body: "Check your connection and try again.",
      retry: "Try again",
      home: "Go to eatnibble.app"
    },
    tr: {
      eyebrow: "eatnibble'dan paylaşıldı",
      plan_title: "Beslenme programı",
      report_title: "Öğün raporu",
      shared_by: "Paylaşan: {name}",
      shared_on: "{date} tarihinde paylaşıldı",
      expires_on: "Link {date} tarihinde sona erer",
      macros_title: "Makro dağılımı",
      macros_note: "Günlük kalorinin payları. Gramları kendi hedefin belirler.",
      protein: "Protein", carbs: "Karbonhidrat", fat: "Yağ",
      short: { protein: "P", carbs: "K", fat: "Y" },
      preset: { balanced: "Dengeli", highProtein: "Yüksek protein", lowCarb: "Düşük karbonhidrat", keto: "Keto", custom: "Özel" },
      cycle_title: "Kalori döngüsü",
      cycle_note: "Yüksek günler %{n} fazla, düşük günler daha az. Hafta dengelenir.",
      level: { low: "Düşük", normal: "Normal", high: "Yüksek" },
      fasting_title: "Aralıklı oruç",
      fasting_note: "{f} saat oruç, {e} saatlik yeme penceresi",
      recipes_title: "Tarifler",
      servings: "{n} porsiyon",
      servings_one: "1 porsiyon",
      per_serving: "porsiyon başı",
      ingredients: "Malzemeler ({n})",
      meals_title: "Sabit öğünler",
      import_title: "Bu programı eatnibble'da kullan",
      import_steps: ["eatnibble'ı App Store'dan indir.", "Bu linki iPhone'unda tekrar aç.", "Neyin ekleneceğini seç: makrolar, döngü, oruç, tarifler, öğünler."],
      import_note: "Kalori hedefin, kilon ve sağlık verilerin sende kalır. Bu programda hiçbiri yok.",
      open_app: "eatnibble'da aç",
      report_days: "{n} gün kayıtlı",
      report_days_one: "1 gün kayıtlı",
      avg_title: "Günlük ortalama",
      avg_note: "Yalnızca kayıtlı günler üzerinden.",
      daily_title: "Günlere göre kalori",
      days_title: "Öğünler",
      report_note: "Yalnızca kaydedilen öğünler paylaşıldı: hedef, kilo ya da sağlık verisi yok.",
      print: "Yazdır",
      notfound_title: "Bu link artık geçerli değil",
      notfound_body: "Süresi dolmuş ya da paylaşan kişi kaldırmış olabilir.",
      error_title: "Sayfa yüklenemedi",
      error_body: "Bağlantını kontrol edip tekrar dene.",
      retry: "Tekrar dene",
      home: "eatnibble.app'e git"
    },
    de: {
      eyebrow: "Geteilt aus eatnibble",
      plan_title: "Ernährungsplan",
      report_title: "Mahlzeitenbericht",
      shared_by: "Geteilt von {name}",
      shared_on: "Geteilt am {date}",
      expires_on: "Link läuft am {date} ab",
      macros_title: "Makroverteilung",
      macros_note: "Anteile an den täglichen Kalorien. Die Gramm ergeben sich aus deinem eigenen Ziel.",
      protein: "Eiweiß", carbs: "Kohlenhydrate", fat: "Fett",
      short: { protein: "E", carbs: "K", fat: "F" },
      preset: { balanced: "Ausgewogen", highProtein: "Proteinreich", lowCarb: "Low Carb", keto: "Keto", custom: "Eigene" },
      cycle_title: "Kalorienzyklus",
      cycle_note: "Hohe Tage bekommen {n} % mehr, niedrige weniger. Die Woche gleicht sich aus.",
      level: { low: "Niedrig", normal: "Normal", high: "Hoch" },
      fasting_title: "Intervallfasten",
      fasting_note: "{f} Stunden fasten, {e} Stunden Essensfenster",
      recipes_title: "Rezepte",
      servings: "Ergibt {n} Portionen",
      servings_one: "Ergibt 1 Portion",
      per_serving: "pro Portion",
      ingredients: "Zutaten ({n})",
      meals_title: "Lieblingsmahlzeiten",
      import_title: "Diesen Plan in eatnibble nutzen",
      import_steps: ["Lade eatnibble aus dem App Store.", "Öffne diesen Link erneut auf deinem iPhone.", "Wähle aus, was übernommen wird: Makros, Zyklus, Fasten, Rezepte, Mahlzeiten."],
      import_note: "Dein Kalorienziel, Gewicht und deine Gesundheitsdaten bleiben bei dir. Nichts davon steckt in diesem Plan.",
      open_app: "In eatnibble öffnen",
      report_days: "{n} Tage erfasst",
      report_days_one: "1 Tag erfasst",
      avg_title: "Tagesdurchschnitt",
      avg_note: "Nur über erfasste Tage.",
      daily_title: "Kalorien pro Tag",
      days_title: "Mahlzeiten",
      report_note: "Geteilt wurden nur erfasste Mahlzeiten: keine Ziele, kein Gewicht, keine Gesundheitsdaten.",
      print: "Drucken",
      notfound_title: "Dieser Link ist nicht mehr verfügbar",
      notfound_body: "Er ist vielleicht abgelaufen oder wurde von der Person entfernt, die ihn geteilt hat.",
      error_title: "Seite konnte nicht geladen werden",
      error_body: "Prüfe deine Verbindung und versuche es erneut.",
      retry: "Erneut versuchen",
      home: "Zu eatnibble.app"
    },
    es: {
      eyebrow: "Compartido desde eatnibble",
      plan_title: "Plan de alimentación",
      report_title: "Informe de comidas",
      shared_by: "Compartido por {name}",
      shared_on: "Compartido el {date}",
      expires_on: "El enlace caduca el {date}",
      macros_title: "Reparto de macros",
      macros_note: "Porcentaje de las calorías diarias. Tu propio objetivo decide los gramos.",
      protein: "Proteínas", carbs: "Carbohidratos", fat: "Grasas",
      short: { protein: "P", carbs: "C", fat: "G" },
      preset: { balanced: "Equilibrado", highProtein: "Alto en proteínas", lowCarb: "Bajo en carbohidratos", keto: "Keto", custom: "Personalizado" },
      cycle_title: "Ciclo de calorías",
      cycle_note: "Los días altos suman un {n} % y los bajos restan. La semana se equilibra.",
      level: { low: "Bajo", normal: "Normal", high: "Alto" },
      fasting_title: "Ayuno intermitente",
      fasting_note: "{f} horas de ayuno, ventana de {e} horas para comer",
      recipes_title: "Recetas",
      servings: "Para {n} raciones",
      servings_one: "Para 1 ración",
      per_serving: "por ración",
      ingredients: "Ingredientes ({n})",
      meals_title: "Comidas fijas",
      import_title: "Usa este plan en eatnibble",
      import_steps: ["Descarga eatnibble en el App Store.", "Vuelve a abrir este enlace en tu iPhone.", "Elige qué añadir: macros, ciclo, ayuno, recetas, comidas."],
      import_note: "Tu objetivo de calorías, tu peso y tus datos de salud siguen siendo tuyos. Nada de eso está en este plan.",
      open_app: "Abrir en eatnibble",
      report_days: "{n} días registrados",
      report_days_one: "1 día registrado",
      avg_title: "Media diaria",
      avg_note: "Solo sobre los días registrados.",
      daily_title: "Calorías por día",
      days_title: "Comidas",
      report_note: "Solo se compartieron las comidas registradas: sin objetivos, peso ni datos de salud.",
      print: "Imprimir",
      notfound_title: "Este enlace ya no está disponible",
      notfound_body: "Puede que haya caducado o que quien lo compartió lo haya eliminado.",
      error_title: "No se pudo cargar esta página",
      error_body: "Comprueba tu conexión y vuelve a intentarlo.",
      retry: "Reintentar",
      home: "Ir a eatnibble.app"
    },
    fr: {
      eyebrow: "Partagé depuis eatnibble",
      plan_title: "Programme alimentaire",
      report_title: "Rapport des repas",
      shared_by: "Partagé par {name}",
      shared_on: "Partagé le {date}",
      expires_on: "Le lien expire le {date}",
      macros_title: "Répartition des macros",
      macros_note: "Part des calories quotidiennes. Ton propre objectif fixe les grammes.",
      protein: "Protéines", carbs: "Glucides", fat: "Lipides",
      short: { protein: "P", carbs: "G", fat: "L" },
      preset: { balanced: "Équilibré", highProtein: "Riche en protéines", lowCarb: "Pauvre en glucides", keto: "Céto", custom: "Personnalisé" },
      cycle_title: "Cycle calorique",
      cycle_note: "Les jours hauts ont {n} % de plus, les jours bas moins. La semaine s'équilibre.",
      level: { low: "Bas", normal: "Normal", high: "Haut" },
      fasting_title: "Jeûne intermittent",
      fasting_note: "{f} heures de jeûne, fenêtre de {e} heures pour manger",
      recipes_title: "Recettes",
      servings: "Pour {n} portions",
      servings_one: "Pour 1 portion",
      per_serving: "par portion",
      ingredients: "Ingrédients ({n})",
      meals_title: "Repas favoris",
      import_title: "Utiliser ce programme dans eatnibble",
      import_steps: ["Télécharge eatnibble sur l'App Store.", "Rouvre ce lien sur ton iPhone.", "Choisis ce qu'il faut ajouter : macros, cycle, jeûne, recettes, repas."],
      import_note: "Ton objectif calorique, ton poids et tes données de santé restent à toi. Rien de tout cela n'est dans ce programme.",
      open_app: "Ouvrir dans eatnibble",
      report_days: "{n} jours enregistrés",
      report_days_one: "1 jour enregistré",
      avg_title: "Moyenne quotidienne",
      avg_note: "Uniquement sur les jours enregistrés.",
      daily_title: "Calories par jour",
      days_title: "Repas",
      report_note: "Seuls les repas enregistrés ont été partagés : pas d'objectifs, de poids ni de données de santé.",
      print: "Imprimer",
      notfound_title: "Ce lien n'est plus disponible",
      notfound_body: "Il a peut-être expiré, ou la personne qui l'a partagé l'a supprimé.",
      error_title: "Impossible de charger cette page",
      error_body: "Vérifie ta connexion et réessaie.",
      retry: "Réessayer",
      home: "Aller sur eatnibble.app"
    }
  };

  var lang = (function () {
    var wanted = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    for (var i = 0; i < wanted.length; i++) {
      var code = String(wanted[i]).toLowerCase().split("-")[0];
      if (STRINGS[code]) return code;
    }
    return "en";
  })();
  var locale = (navigator.languages && navigator.languages[0]) || navigator.language || lang;
  if (String(locale).toLowerCase().split("-")[0] !== lang) locale = lang;
  var S = STRINGS[lang];
  document.documentElement.lang = lang;

  function t(text, values) {
    return String(text).replace(/\{(\w+)\}/g, function (_, key) {
      return values && values[key] != null ? values[key] : "";
    });
  }

  // h("div", { class: "x" }, child, "text", [children]) — children may be nodes, strings or arrays.
  function h(tag, props) {
    var node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (key) {
        var value = props[key];
        if (value == null || value === false) return;
        if (key === "class") node.className = value;
        else if (key === "style") node.setAttribute("style", value);
        else if (key === "text") node.textContent = value;
        else if (key.slice(0, 2) === "on") node.addEventListener(key.slice(2), value);
        else node.setAttribute(key, value === true ? "" : value);
      });
    }
    for (var i = 2; i < arguments.length; i++) append(node, arguments[i]);
    return node;
  }

  function append(node, child) {
    if (child == null || child === false) return;
    if (Array.isArray(child)) return child.forEach(function (c) { append(node, c); });
    node.appendChild(typeof child === "string" || typeof child === "number" ? document.createTextNode(String(child)) : child);
  }

  var number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  var decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });

  function fmtDate(value, opts) {
    var date = typeof value === "string" && value.length === 10 ? new Date(value + "T12:00:00") : new Date(value);
    return new Intl.DateTimeFormat(locale, opts || { day: "numeric", month: "long", year: "numeric" }).format(date);
  }

  function kcal(value) {
    return number.format(Math.round(value)) + " kcal";
  }

  function macroLine(total) {
    return ["protein", "carbs", "fat"].map(function (key) {
      return h("span", { class: "share-macro-chip" },
        h("i", { class: "share-dot", style: "background:" + COLORS[key], "aria-hidden": "true" }),
        h("span", { class: "share-sr" }, S[key] + " "),
        h("span", { "aria-hidden": "true" }, S.short[key] + " "),
        number.format(Math.round(total[key + "_g"])) + " g");
    });
  }

  function icon(paths) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    paths.forEach(function (d) {
      var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", d);
      svg.appendChild(p);
    });
    return svg;
  }

  var ICONS = {
    pie: ["M12 3a9 9 0 1 0 9 9h-9z", "M15 3.5A9 9 0 0 1 20.5 9H15z"],
    cycle: ["M4 12a8 8 0 0 1 13.7-5.6L20 8", "M20 4v4h-4", "M20 12a8 8 0 0 1-13.7 5.6L4 16", "M4 20v-4h4"],
    clock: ["M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18", "M12 7v5l3 2"],
    book: ["M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z", "M4 19V5", "M8 7h7"],
    pin: ["M12 17v4", "M8 3h8l-1 5 3 4H6l3-4z"],
    chart: ["M4 20V10", "M10 20V4", "M16 20v-7", "M22 20H2"],
    list: ["M8 6h12", "M8 12h12", "M8 18h12", "M4 6h.01", "M4 12h.01", "M4 18h.01"],
    warn: ["M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18", "M12 8v5", "M12 16h.01"]
  };

  function card(iconName, title, body, extraClass) {
    return h("section", { class: "share-card" + (extraClass ? " " + extraClass : "") },
      h("h2", { class: "share-card-title" }, icon(ICONS[iconName]), title),
      body);
  }

  // ---- Header ----

  function header(data, title) {
    var meta = [t(S.shared_on, { date: fmtDate(data.created_at) })];
    if (data.expires_at) meta.push(t(S.expires_on, { date: fmtDate(data.expires_at) }));
    return h("header", { class: "share-head" },
      h("span", { class: "eyebrow" }, S.eyebrow),
      h("h1", null, title),
      h("p", { class: "share-byline" }, t(S.shared_by, { name: data.name })),
      data.note ? h("blockquote", { class: "share-note" }, data.note) : null,
      h("p", { class: "share-meta" }, meta.join(" · ")));
  }

  // ---- Plan ----

  function macrosCard(plan) {
    var m = plan.macros;
    var p = m.protein, c = m.protein + m.carbs;
    var ring = h("div", {
      class: "share-ring",
      role: "img",
      "aria-label": S.protein + " " + m.protein + "%, " + S.carbs + " " + m.carbs + "%, " + S.fat + " " + m.fat + "%",
      style: "background: conic-gradient(var(--protein) 0 " + p + "%, var(--brand) " + p + "% " + c + "%, var(--fat) " + c + "% 100%)"
    }, h("div", { class: "share-ring-hole" },
      h("strong", null, S.preset[plan.macro_preset] || S.preset.custom)));
    var legend = h("ul", { class: "share-legend" }, ["protein", "carbs", "fat"].map(function (key) {
      return h("li", null,
        h("i", { class: "share-dot", style: "background:" + COLORS[key], "aria-hidden": "true" }),
        h("span", null, S[key]),
        h("strong", null, m[key] + "%"));
    }));
    return card("pie", S.macros_title, [
      h("div", { class: "share-macros" }, ring, legend),
      h("p", { class: "share-fine" }, S.macros_note)
    ]);
  }

  function cycleCard(cycle) {
    // Calendar weekday keys: 1 = Sunday … 7 = Saturday. Monday first, except en-US.
    var order = /^en-us$/i.test(locale) ? [1, 2, 3, 4, 5, 6, 7] : [2, 3, 4, 5, 6, 7, 1];
    var dayName = new Intl.DateTimeFormat(locale, { weekday: "short" });
    var sunday = new Date(2026, 10, 1, 12); // a Sunday
    var days = h("ol", { class: "share-week" }, order.map(function (weekday) {
      var level = cycle.days[String(weekday)] || "normal";
      var date = new Date(sunday.getTime() + (weekday - 1) * 86400000);
      return h("li", { class: "share-day is-" + level },
        h("span", { class: "share-day-name" }, dayName.format(date)),
        h("span", { class: "share-day-bar", "aria-hidden": "true" }),
        h("span", { class: "share-day-level" }, S.level[level]));
    }));
    return card("cycle", S.cycle_title, [days, h("p", { class: "share-fine" }, t(S.cycle_note, { n: cycle.high_percent }))]);
  }

  function fastingCard(hours) {
    var eat = 24 - hours;
    var bar = h("div", { class: "share-fast-bar", role: "img", "aria-label": t(S.fasting_note, { f: hours, e: eat }) },
      h("span", { class: "share-fast-fast", style: "flex:" + hours }),
      h("span", { class: "share-fast-eat", style: "flex:" + eat }));
    return card("clock", S.fasting_title, [
      h("p", { class: "share-big" }, hours + ":" + eat),
      bar,
      h("p", { class: "share-fine" }, t(S.fasting_note, { f: hours, e: eat }))
    ]);
  }

  function sum(items) {
    return items.reduce(function (acc, item) {
      acc.calories += item.calories; acc.protein_g += item.protein_g; acc.carbs_g += item.carbs_g; acc.fat_g += item.fat_g;
      return acc;
    }, { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 });
  }

  function scale(total, factor) {
    return { calories: total.calories * factor, protein_g: total.protein_g * factor, carbs_g: total.carbs_g * factor, fat_g: total.fat_g * factor };
  }

  function itemRow(item) {
    return h("li", { class: "share-item" },
      h("span", { class: "share-item-name" }, item.name),
      h("span", { class: "share-item-amount" }, number.format(item.portion_grams) + " " + (item.unit === "ml" ? "ml" : "g")),
      h("span", { class: "share-item-kcal" }, kcal(item.calories)));
  }

  function recipesCard(recipes) {
    var list = h("ul", { class: "share-list" }, recipes.map(function (recipe) {
      var per = scale(sum(recipe.ingredients), 1 / recipe.servings);
      return h("li", { class: "share-row share-row-block" },
        h("div", { class: "share-row-main" },
          h("div", null,
            h("h3", null, recipe.name),
            h("p", { class: "share-row-sub" }, recipe.servings === 1 ? S.servings_one : t(S.servings, { n: decimal.format(recipe.servings) }))),
          h("div", { class: "share-row-end" },
            h("strong", null, kcal(per.calories)),
            h("span", { class: "share-row-sub" }, S.per_serving))),
        h("div", { class: "share-macro-line" }, macroLine(per)),
        h("details", { class: "share-details" },
          h("summary", null, t(S.ingredients, { n: recipe.ingredients.length })),
          h("ul", { class: "share-items" }, recipe.ingredients.map(itemRow))));
    }));
    return card("book", S.recipes_title, list, "share-card-wide");
  }

  function mealsCard(meals) {
    var list = h("ul", { class: "share-list" }, meals.map(function (meal) {
      return h("li", { class: "share-row share-row-block" },
        h("div", { class: "share-row-main" },
          h("h3", null, meal.meal_name),
          h("strong", { class: "share-row-end" }, kcal(meal.total.calories))),
        h("div", { class: "share-macro-line" }, macroLine(meal.total)),
        meal.items && meal.items.length > 1 ? h("p", { class: "share-row-sub" }, meal.items.map(function (i) { return i.name; }).join(", ")) : null);
    }));
    return card("pin", S.meals_title, list, "share-card-wide");
  }

  function importPanel(id) {
    var isApple = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    return h("section", { class: "share-import" },
      h("div", null,
        h("h2", null, S.import_title),
        h("ol", { class: "share-steps" }, S.import_steps.map(function (step) { return h("li", null, step); })),
        h("p", { class: "share-fine" }, S.import_note)),
      h("div", { class: "share-import-actions" },
        h("a", { class: "store-badge", href: STORE, "aria-label": "Download on the App Store" },
          h("picture", null,
            h("source", { srcset: "/icons/app-store-badge-white.svg", media: "(prefers-color-scheme: dark)" }),
            h("img", { src: "/icons/app-store-badge-black.svg", alt: "Download on the App Store", width: "180", height: "60" }))),
        isApple ? h("a", { class: "btn btn-ghost", href: "eatnibble://p/" + encodeURIComponent(id) }, S.open_app) : null));
  }

  function renderPlan(data) {
    var plan = data.plan;
    var cards = [macrosCard(plan)];
    if (plan.calorie_cycle) cards.push(cycleCard(plan.calorie_cycle));
    if (plan.fasting_hours) cards.push(fastingCard(plan.fasting_hours));
    if (plan.recipes && plan.recipes.length) cards.push(recipesCard(plan.recipes));
    if (plan.meals && plan.meals.length) cards.push(mealsCard(plan.meals));
    document.title = S.plan_title + " · " + data.name + " · eatnibble";
    return [header(data, S.plan_title), h("div", { class: "share-grid" }, cards), importPanel(data.id)];
  }

  // ---- Report ----

  function averageCard(days) {
    var avg = scale(sum(days.map(function (d) { return d.total; })), 1 / days.length);
    var stats = h("div", { class: "share-stats" },
      h("div", { class: "share-stat share-stat-main" },
        h("span", { class: "share-stat-label" }, "kcal"),
        h("strong", null, number.format(Math.round(avg.calories)))),
      ["protein", "carbs", "fat"].map(function (key) {
        return h("div", { class: "share-stat" },
          h("span", { class: "share-stat-label" },
            h("i", { class: "share-dot", style: "background:" + COLORS[key], "aria-hidden": "true" }), S[key]),
          h("strong", null, number.format(Math.round(avg[key + "_g"])) + " g"));
      }));
    return card("pie", S.avg_title, [stats, h("p", { class: "share-fine" }, S.avg_note)], "share-card-wide");
  }

  function chartCard(days) {
    var max = Math.max.apply(null, days.map(function (d) { return d.total.calories; })) || 1;
    var label = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" });
    var bars = h("ol", { class: "share-chart", style: "--count:" + days.length }, days.map(function (day) {
      var pct = Math.max(2, Math.round((day.total.calories / max) * 100));
      var dateText = label.format(new Date(day.date + "T12:00:00"));
      return h("li", { class: "share-bar", title: dateText + " · " + kcal(day.total.calories) },
        h("span", { class: "share-bar-fill", style: "height:" + pct + "%" }),
        h("span", { class: "share-sr" }, dateText + ": " + kcal(day.total.calories)));
    }));
    var axis = h("div", { class: "share-chart-axis", "aria-hidden": "true" },
      h("span", null, label.format(new Date(days[0].date + "T12:00:00"))),
      days.length > 1 ? h("span", null, label.format(new Date(days[days.length - 1].date + "T12:00:00"))) : null);
    return card("chart", S.daily_title, [bars, axis], "share-card-wide");
  }

  function daysCard(days) {
    var dayLabel = { weekday: "long", day: "numeric", month: "long" };
    var list = h("ol", { class: "share-days" }, days.slice().reverse().map(function (day) {
      return h("li", { class: "share-day-block" },
        h("div", { class: "share-day-head" },
          h("h3", null, fmtDate(day.date, dayLabel)),
          h("strong", null, kcal(day.total.calories))),
        h("div", { class: "share-macro-line" }, macroLine(day.total)),
        h("ul", { class: "share-meals" }, day.meals.map(function (meal) {
          return h("li", { class: "share-meal" },
            h("span", { class: "share-meal-time" }, meal.time),
            h("span", { class: "share-meal-name" }, meal.meal_name),
            h("span", { class: "share-meal-kcal" }, kcal(meal.total.calories)));
        })));
    }));
    return card("list", S.days_title, list, "share-card-wide");
  }

  function renderReport(data) {
    var report = data.report;
    var days = report.days;
    var range = report.from === report.to ? fmtDate(report.from) : fmtDate(report.from) + " – " + fmtDate(report.to);
    var count = days.length === 1 ? S.report_days_one : t(S.report_days, { n: days.length });
    document.title = S.report_title + " · " + data.name + " · eatnibble";
    var head = header(data, S.report_title);
    head.insertBefore(h("p", { class: "share-range" }, range + " · " + count), head.querySelector(".share-byline").nextSibling);
    var actions = h("div", { class: "share-actions" },
      h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: function () { window.print(); } }, S.print));
    return [head, actions,
      h("div", { class: "share-grid" }, averageCard(days), chartCard(days), daysCard(days)),
      h("p", { class: "share-fine share-foot" }, S.report_note)];
  }

  // ---- States ----

  function message(title, body, action) {
    return h("div", { class: "share-empty" },
      icon(ICONS.warn),
      h("h1", null, title),
      h("p", { class: "lead" }, body),
      action);
  }

  function show(nodes) {
    var root = document.getElementById("share-root");
    root.textContent = "";
    append(root, nodes);
    document.getElementById("main").setAttribute("aria-busy", "false");
  }

  function shareId() {
    var match = location.pathname.match(/^\/[pr]\/([A-Za-z0-9]{10})\/?$/);
    if (match) return match[1];
    return new URLSearchParams(location.search).get("id");
  }

  function load() {
    var id = shareId();
    if (!id) {
      show(message(S.notfound_title, S.notfound_body, h("a", { class: "btn btn-primary", href: "/" }, S.home)));
      return;
    }
    fetch(API + encodeURIComponent(id), { headers: { Accept: "application/json" } })
      .then(function (res) {
        if (res.status === 404) return { missing: true };
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        if (data.missing || (data.kind !== "plan" && data.kind !== "report")) {
          show(message(S.notfound_title, S.notfound_body, h("a", { class: "btn btn-primary", href: "/" }, S.home)));
          return;
        }
        show(data.kind === "plan" ? renderPlan(data) : renderReport(data));
      })
      .catch(function () {
        show(message(S.error_title, S.error_body,
          h("button", { class: "btn btn-primary", type: "button", onclick: function () { load(); } }, S.retry)));
      });
  }

  load();
})();
