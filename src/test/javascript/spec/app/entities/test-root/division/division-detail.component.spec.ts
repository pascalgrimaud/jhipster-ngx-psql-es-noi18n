/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../../test.module';
import { DivisionDetailComponent } from 'app/entities/test-root/division/division-detail.component';
import { Division } from 'app/shared/model/test-root/division.model';

describe('Component Tests', () => {
    describe('Division Management Detail Component', () => {
        let comp: DivisionDetailComponent;
        let fixture: ComponentFixture<DivisionDetailComponent>;
        const route = ({ data: of({ division: new Division(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [DivisionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DivisionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DivisionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.division).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
