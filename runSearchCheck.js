function runSearch() {
        const from = document.getElementById('fromSt').value;
        const to = document.getElementById('toSt').value;
        const via = document.getElementById('viaSt').value;
        
        if (!from || !to) return alert("駅名を入力してください");

        const resultsArea = document.getElementById('transferResults');
        resultsArea.innerHTML = `<div id="searching-status" style="text-align:center; padding:40px; color:#7f8c8d;">
            <div style="font-size:2rem; margin-bottom:10px;">🔍</div>
            <strong>経路を探索中...</strong><br>
            <small id="search-progress">最適なルートを探しています。</small>
        </div><div id="found-results"></div>`;

        setTimeout(() => {
            const routes = searchSimple(from, to);
            
            if (!routes || routes.length === 0) {
                document.getElementById('searching-status').style.display = 'none';
                document.getElementById('found-results').innerHTML = "<p style='text-align:center; padding:20px;'>経路が見つかりませんでした。</p>";
                return;
            }

            const baseTime = parseInt(hs.value) * 60 + parseInt(ms.value);

            const processedRoutes = routes.map((route, idx) => {
                const withService = applyServiceToPath(route.path);
                const withTime = applyTime(withService, baseTime);
                const withFare = applyFare(withTime);
                
                return {
                    path: route.path,
                    schedule: withTime,
                    fare: withFare,
                    idx: idx
                };
            });

            finishSearch(processedRoutes, baseTime);

            function finishSearch(allRoutes, startTime) {
                const status = document.getElementById('searching-status');
                if (status) status.style.display = 'none';

                if (allRoutes.length === 0) {
                    document.getElementById('found-results').innerHTML = "<p style='text-align:center; padding:20px;'>指定された路線の経路が見つかりませんでした。</p>";
                    return;
                }

                const minTime = Math.min(...allRoutes.map(r => r.schedule[r.schedule.length - 1].arrival - startTime));
                const minTransfers = Math.min(...allRoutes.map(r => r.schedule.filter(s => s.type === "transfer").length));
                const minFare = Math.min(...allRoutes.map(r => r.fare.totalFare));

                let html = allRoutes.map((route, idx) => {
                    const totalTime = route.schedule[route.schedule.length - 1].arrival - startTime;
                    const transferCount = route.schedule.filter(s => s.type === "transfer").length;
                    const isFast = totalTime === minTime;
                    const isEasy = transferCount === minTransfers;
                    const isCheap = route.fare.totalFare === minFare;

                    return renderRouteHtml(route, idx + 1, startTime, { isFast, isEasy, isCheap });
                }).join('');

                html += `<div class="time-shift-buttons"><button class="btn-shift" onclick="shiftTime(-15)">1本前</button><button class="btn-shift" onclick="shiftTime(15)">1本後</button></div>`;
                document.getElementById('found-results').innerHTML = html;
            }

            function renderRouteHtml(route, idx, startTime, tags) {
                const type = document.querySelector('input[name="stype"]:checked').value;
                
                const formatT = (m) => {
                    if (isNaN(m)) return "--:--";
                    while (m < 0) m += 1440;
                    m %= 1440;
                    return `${Math.floor(m / 60).toString().padStart(2, '0')}:${Math.floor(m % 60).toString().padStart(2, '0')}`;
                };

                const formatDur = (m) => {
                    const totalM = Math.ceil(m);
                    if (totalM < 60) return `${totalM}分`;
                    const h = Math.floor(totalM / 60);
                    const rm = totalM % 60;
                    return rm > 0 ? `${h}時間${rm}分` : `${h}時間`;
                };

                const firstStep = route.schedule[0];
                const lastStep = route.schedule[route.schedule.length - 1];
                const totalTime = lastStep.arrival - startTime;
                const totalFare = route.fare.totalFare;

                let tagHtml = "";
                if (tags && tags.isFast) tagHtml += `<span class="spec-tag tag-fast">早</span>`;
                if (tags && tags.isEasy) tagHtml += `<span class="spec-tag tag-easy">楽</span>`;
                if (tags && tags.isCheap) tagHtml += `<span class="spec-tag tag-cheap">安</span>`;

                const stepHtml = route.schedule.map(step => {
                    if (step.type === "transfer") {
                        return `<div class="station-item via-station">
                            <div class="role-tag">【乗換】</div>
                            <div class="station-info-row">
                                <span class="time-info-text">${formatT(step.arrival)}</span>
                                <span class="station-name-text">${step.station}</span>
                            </div>
                            <div class="time-info-text" style="margin-left:65px; color:#666;">乗換待ち ${step.departure - step.arrival}分</div>
                        </div>`;
                    } else if (step.type === "ride") {
                        let fareInfo = `<div style="font-size:0.75rem; color:#7f8c8d; margin-left:65px;">${step.distance?.toFixed(1) || '?'}km / 運賃 ${step.baseFare}円`;
                        if (step.surcharge > 0) {
                            fareInfo += ` + 特急料 ${step.surcharge}円`;
                        }
                        fareInfo += `</div>`;
                        
                        let stationHtml = `<div class="station-item boarding-station">
                            <div class="role-tag">【乗車】</div>
                            <div class="station-info-row">
                                <span class="time-info-text">${formatT(step.departure)}</span>
                                <span class="station-name-text">${step.stations[0]}</span>
                                <span class="line-badge ${step.line}">${step.service} (${step.line})</span>
                            </div>
                            ${fareInfo}
                        </div>`;

                        for (let i = 1; i < step.stations.length - 1; i++) {
                            stationHtml += `<div class="station-item" style="opacity:0.8; margin-bottom:10px;">
                                <div class="station-info-row">
                                    <span class="station-name-text" style="font-size:1.1rem; font-weight:normal;">${step.stations[i]}</span>
                                </div>
                            </div>`;
                        }

                        stationHtml += `<div class="station-item alighting-station">
                            <div class="role-tag">【降車】</div>
                            <div class="station-info-row">
                                <span class="time-info-text">${formatT(step.arrival)}</span>
                                <span class="station-name-text">${step.stations[step.stations.length - 1]}</span>
                            </div>
                        </div>`;

                        return stationHtml;
                    }
                    return "";
                }).join('');

                const costStr = route.fare.totalSur > 0 ? `${route.fare.totalFare}円 (運賃${route.fare.totalBase}+特急料${route.fare.totalSur})` : `${route.fare.totalFare}円`;

                return `<div class="route-result-item">
                    <div class="route-header">
                        <span><span class="route-tag-id">経路 ${idx}</span><strong>${route.schedule.filter(s => s.type === "transfer").length}回乗換</strong>${tagHtml}</span>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <span style="color:#2980b9; font-weight:bold;">${formatDur(totalTime)} / ${totalFare}円</span>
                            <button onclick="buyTicket('${from}', '${to}', ${route.fare.totalBase}, ${route.fare.totalSur})" style="background:var(--secondary); color:white; border:none; padding:5px 10px; border-radius:4px; font-size:0.8rem; cursor:pointer;">切符を買う</button>
                        </div>
                    </div>
                    <div class="route-box">
                        <span class="res-time-main">${formatT(firstStep.departure)} ～ ${formatT(lastStep.arrival)}</span>
                        <div style="font-size:0.9rem; color:#666; margin-bottom:10px;">${costStr}</div>
                        <div class="vertical-station-list">${stepHtml}</div>
                    </div>
                </div>`;
            }
        }, 100);
    }
