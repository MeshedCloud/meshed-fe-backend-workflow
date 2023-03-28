/* eslint-disable @typescript-eslint/no-unused-vars */
import {  NsGraph } from '@antv/xflow'
/** mock 后端接口调用 */
export namespace MockApi {

  /** 加载图数据的api */
  export const loadGraphData = async (meta: NsGraph.IGraphMeta) => {
    return {
      nodes: [
        {
          id: 'node-2a794021-7c5d-4f14-a115-8dd4aad3c213',
          renderKey: 'startEvent',
          name: 'startEvent',
          label: '流程开始',
          width: 210,
          height: 65,
          ports: {
            items: [
              {
                group: 'top',
                id: '6a4618fe-dbc9-4254-b2a8-6186345b318a'
              },
              {
                group: 'right',
                id: 'f9ba958a-5214-464e-8fff-aba6e49a19cd'
              },
              {
                group: 'bottom',
                id: '6a7d5ba7-614a-48a1-a2b0-f71860be2897'
              },
              {
                group: 'left',
                id: '93815cf1-ce12-40ed-8aaf-4a56f51de688'
              }
            ],
            groups: {
              top: {
                position: {
                  name: 'top'
                },
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden'
                    }
                  }
                },
                zIndex: 10
              },
              right: {
                position: {
                  name: 'right'
                },
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden'
                    }
                  }
                },
                zIndex: 10
              },
              bottom: {
                position: {
                  name: 'bottom'
                },
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden'
                    }
                  }
                },
                zIndex: 10
              },
              left: {
                position: {
                  name: 'left'
                },
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden'
                    }
                  }
                },
                zIndex: 10
              }
            }
          },
          isCustom: true,
          parentKey: 'base',
          x: 480,
          y: 130,
          zIndex: 10,
          incomingEdges: null,
          outgoingEdges: [
            {
              shape: 'edge',
              id: 'node-2a794021-7c5d-4f14-a115-8dd4aad3c213:6a7d5ba7-614a-48a1-a2b0-f71860be2897-node-bb2160b5-9a28-4873-ad0c-7de6c34e0ffe:647a134a-9a67-4efb-a0a3-cced43fb596d',
              targetPortId: '647a134a-9a67-4efb-a0a3-cced43fb596d',
              sourcePortId: '6a7d5ba7-614a-48a1-a2b0-f71860be2897',
              zIndex: 1,
              source: {
                cell: 'node-2a794021-7c5d-4f14-a115-8dd4aad3c213',
                port: '6a7d5ba7-614a-48a1-a2b0-f71860be2897'
              },
              target: {
                cell: 'node-bb2160b5-9a28-4873-ad0c-7de6c34e0ffe',
                port: '647a134a-9a67-4efb-a0a3-cced43fb596d'
              },
            }
          ]
        },
        {
          id: 'node-bb2160b5-9a28-4873-ad0c-7de6c34e0ffe',
          renderKey: 'initiatorEvent',
          name: 'initiatorEvent',
          label: '发起人',
          width: 210,
          height: 65,
          ports: {
            items: [
              {
                group: 'top',
                id: '647a134a-9a67-4efb-a0a3-cced43fb596d'
              },
              {
                group: 'right',
                id: '64926962-18d7-4376-9796-4050daf7b644'
              },
              {
                group: 'bottom',
                id: 'b0657a33-4eb5-429a-8873-c5fd07d690ba'
              },
              {
                group: 'left',
                id: '8bb119ec-52d0-432b-9dae-b2b02b140cfb'
              }
            ],
            groups: {
              top: {
                position: {
                  name: 'top'
                },
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden'
                    }
                  }
                },
                zIndex: 10
              },
              right: {
                position: {
                  name: 'right'
                },
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden'
                    }
                  }
                },
                zIndex: 10
              },
              bottom: {
                position: {
                  name: 'bottom'
                },
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden'
                    }
                  }
                },
                zIndex: 10
              },
              left: {
                position: {
                  name: 'left'
                },
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden'
                    }
                  }
                },
                zIndex: 10
              }
            }
          },
          isCustom: true,
          parentKey: 'base',
          x: 480,
          y: 314,
          zIndex: 10,
          incomingEdges: [
            {
              shape: 'edge',
              id: 'node-2a794021-7c5d-4f14-a115-8dd4aad3c213:6a7d5ba7-614a-48a1-a2b0-f71860be2897-node-bb2160b5-9a28-4873-ad0c-7de6c34e0ffe:647a134a-9a67-4efb-a0a3-cced43fb596d',
              targetPortId: '647a134a-9a67-4efb-a0a3-cced43fb596d',
              sourcePortId: '6a7d5ba7-614a-48a1-a2b0-f71860be2897',
              zIndex: 1,
              source: {
                cell: 'node-2a794021-7c5d-4f14-a115-8dd4aad3c213',
                port: '6a7d5ba7-614a-48a1-a2b0-f71860be2897'
              },
              target: {
                cell: 'node-bb2160b5-9a28-4873-ad0c-7de6c34e0ffe',
                port: '647a134a-9a67-4efb-a0a3-cced43fb596d'
              },
            }
          ],
          outgoingEdges: null
        }
      ],
      edges: [
        {
          id: 'node-2a794021-7c5d-4f14-a115-8dd4aad3c213:6a7d5ba7-614a-48a1-a2b0-f71860be2897-node-bb2160b5-9a28-4873-ad0c-7de6c34e0ffe:647a134a-9a67-4efb-a0a3-cced43fb596d',
          targetPortId: '647a134a-9a67-4efb-a0a3-cced43fb596d',
          sourcePortId: '6a7d5ba7-614a-48a1-a2b0-f71860be2897',
          source: {
            cell: 'node-2a794021-7c5d-4f14-a115-8dd4aad3c213',
            port: '6a7d5ba7-614a-48a1-a2b0-f71860be2897'
          },
          target: {
            cell: 'node-bb2160b5-9a28-4873-ad0c-7de6c34e0ffe',
            port: '647a134a-9a67-4efb-a0a3-cced43fb596d'
          },
          attrs: {
            line: {
              stroke: '#A2B1C3',
              targetMarker: {
                name: 'block',
                width: 12,
                height: 8
              },
              strokeDasharray: '5 5',
              strokeWidth: 1
            }
          },
          zIndex: 1,
          sourcePort: '6a7d5ba7-614a-48a1-a2b0-f71860be2897',
          targetPort: '647a134a-9a67-4efb-a0a3-cced43fb596d'
        }
      ]
    }
  }
}
