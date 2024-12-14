/* eslint-disable import/no-anonymous-default-export */

export default function () {
  return (
    <div className="container">
      <div className="row gap-3 justify-content-center">
        <div
          className="col-12"
          style={{
            cssText:
              "text-align: center; background-color: #fffdf4; border-radius: 16px",
          }}
        >
          <img src="/assets/settings/guy.png" alt="guy sending" />
        </div>

        <div
          className="col-12 col-lg-8 py-2 d-flex align-items-center gap-2"
          style={{
            cssText:
              "border: 1px solid #fffdf4; color: var(--primary); font-weight: 700; font-size: large;",
          }}
        >
          <img src="/assets/settings/coins.png" alt="coins" />
          <span className="flex-grow-1">نقطة</span>
          100
        </div>

        <div className="col-12 col-lg-8" style={{ textAlign: "center" }}>
          <span
            className="d-block h5"
            style={{ cssText: "color: var(--primary); font-weight: 700" }}
          >
            ابدأ إرسال الترشيحات
          </span>
          <span
            className="d-block"
            style={{ cssText: "color: var(--midgray)" }}
          >
            يمكنك ترشيح مون 10 لأصدقاءك والحصول على مكافأة في محفظتك عندما:
          </span>

          <div className="gap-3 justify-content-around mt-5 row m-0">
            <a
              href="/public/mobile/"
              className="align-items-center col-12 col-lg d-flex flex-column gap-3 py-2 text-decoration-none"
              style={{
                cssText:
                  "color: var(--midgray); border: 1px solid #FFCD00; border-radius: 8px; max-width: 584px; background-color: #fbfbfb;",
              }}
            >
              <img src="/assets/settings/delivery.png" alt="delevery" />
              <span
                className="h5 m-0"
                style={{ cssText: "color: var(--primary);" }}
              >
                أكمل 5 طلبات
              </span>
              <progress value={3} max={5}></progress>
              متبقي 5 طلبات
            </a>

            <a
              href="/public/mobile/"
              className="align-items-center col-12 col-lg d-flex flex-column gap-3 py-2 text-decoration-none"
              style={{
                cssText:
                  "color: var(--midgray); border: 1px solid #FFCD00; border-radius: 8px; max-width: 584px; background-color: #fbfbfb;",
              }}
            >
              <img src="/assets/settings/wallet.png" alt="delevery" />
              <span
                className="h5 m-0"
                style={{ cssText: "color: var(--primary);" }}
              >
                أصرف 1000 ر.س أو أكثر
              </span>
              <progress value={460} max={1000}></progress>
              متبقي 540 ر.س
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
