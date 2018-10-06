/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestManyToOneMySuffixComponent } from 'app/entities/test-many-to-one-my-suffix/test-many-to-one-my-suffix.component';
import { TestManyToOneMySuffixService } from 'app/entities/test-many-to-one-my-suffix/test-many-to-one-my-suffix.service';
import { TestManyToOneMySuffix } from 'app/shared/model/test-many-to-one-my-suffix.model';

describe('Component Tests', () => {
    describe('TestManyToOneMySuffix Management Component', () => {
        let comp: TestManyToOneMySuffixComponent;
        let fixture: ComponentFixture<TestManyToOneMySuffixComponent>;
        let service: TestManyToOneMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestManyToOneMySuffixComponent],
                providers: []
            })
                .overrideTemplate(TestManyToOneMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestManyToOneMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestManyToOneMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TestManyToOneMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.testManyToOnes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
